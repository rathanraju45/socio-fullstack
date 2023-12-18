import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import List "mo:base/List";
import Array "mo:base/Array";
import Debug "mo:base/Debug";

actor Socio {

  stable var userPool : List.List<Text> = List.nil<Text>();

  type Message = {
    id: Text;
    message: Text;
    sender: Text;
  };

  type Messages = List.List<Message>;

  type User = {
    id: Text;
    password : Text;
    profilepic: Text;
    friendList: List.List<Text>;
  };

  type Chats = {
    messages: Messages;
  };

  private var userList = HashMap.HashMap<Text, User>(5, Text.equal, Text.hash);

  private var chatList = HashMap.HashMap<Text, Chats>(5,Text.equal, Text.hash);

  private stable var userListEntries : [(Text, User)] = [];

  private stable var chatListEntries : [(Text, Chats)] = [];

  system func preupgrade() {
    userListEntries := Iter.toArray(userList.entries());
    chatListEntries := Iter.toArray(chatList.entries());
  };

  system func postupgrade() {
    userList := HashMap.fromIter<Text, User>(userListEntries.vals(), 5, Text.equal, Text.hash);
    userListEntries := [];
    chatList := HashMap.fromIter<Text, Chats>(chatListEntries.vals(), 5, Text.equal, Text.hash);
    chatListEntries := [];
  };

  public func wipeData() : async Text {
    // Wipe all data
    userList := HashMap.HashMap<Text, User>(5, Text.equal, Text.hash);
    userPool := List.nil<Text>();
    chatList := HashMap.HashMap<Text, Chats>(5, Text.equal, Text.hash);
    return "Data wiped successfully";
  };

  public func getPublicUsers() : async [Text]{
    return List.toArray(userPool);
  };

  public shared ({ caller }) func createUser(userName : Text, passWord : Text,ID : Text) : async Text{
    switch (userList.get(userName)) {
      case null {
          let newUser : User = {
            id = ID;
            password = passWord;
            profilepic = "nil";
            friendList = List.nil<Text>();
          };

          userPool := List.push(userName,userPool);

          userList.put(userName, newUser);

          return "Account created";
        };
        case (?_) {
          return "User already exist";
        };
      };
  };


  public query func checkUser(userName : Text, passWord : Text) : async Text {
    switch (userList.get(userName)) {
      case (?user) {
        if (user.password == passWord) {
          return "0";
        } else {
          return "1";
        };
      };
      case null {
        return "2";
      };
    };
  };

  public query func getDP(userName : Text) : async Text{
    switch (userList.get(userName)){
      case (?user){
        return user.profilepic;
      };
      case null {
        return "nil";
      };
    };
  };

  public query func getFriendsList(userName : Text) : async [Text]{
    switch (userList.get(userName)){
      case (?user){
        return List.toArray(user.friendList);
      };
      case null {
        return [];
      };
    };
  };

  public query func getMessages(bondName1 : Text,bondName2 : Text) : async [Message]{

    switch (chatList.get(bondName1)){
      case (?chat){
        return List.toArray(chat.messages);
      };
      case null{
        switch (chatList.get(bondName2)){
          case (?chat){
            return List.toArray(chat.messages);
          };
          case null{
            return [];
          };
        };
      };
    };
  };

  public shared ({ caller }) func addMessage(bondName1: Text, bondName2: Text ,newMessage: Message) : async ?(Chats) {


    var bondName : Text = "";

    switch (chatList.get(bondName1)){
      case (?chat){
        bondName := bondName1;
      };
      case null{
        switch (chatList.get(bondName2)){
          case (?chat){
            bondName := bondName2;
          };
          case null{
            bondName := "";
          };
        };
      };
    };

    Debug.print(debug_show(bondName));

    if (bondName != ""){
      switch (chatList.get(bondName)){
          case null {
            let newChat : Chats = { messages = List.push<Message>(newMessage, List.nil<Message>()) };
            chatList.put(bondName, newChat);
            return null;
          };
          case (?chat){
            let updatedMessages = List.push<Message>(newMessage, chat.messages);
            let updatedChat : Chats = { messages = updatedMessages };
            chatList.replace(bondName, updatedChat);
          };
        };
    }
    else{
      return null;
    };

  };

  public func addFriend(userName:Text,friendName:Text) : async Text{
    switch (userList.get(userName)){
      case (?user){ 

        func change(name:Text) : Bool {
          name == friendName;
        };

        let checkExists = List.some<Text>(user.friendList,change);

        var bondStatus : Text = "";

        switch(checkExists){
          case false{
            let newFreindList = List.push<Text>(friendName, user.friendList);
            let newUser = {
              id = user.id;
              password = user.password;
              profilepic = user.profilepic;
              friendList = newFreindList;
            };
            let temp = userList.replace(userName,newUser);

            switch(userList.get(friendName)){
              case(?user1){
                let user1FriendList = List.push<Text>(userName,user1.friendList);
                let newUser1 = {
                  id = user1.id;
                  password = user1.password;
                  profilepic = user1.profilepic;
                  friendList = user1FriendList;
                };

                let updatedFriend = userList.replace(friendName,newUser1);
              };
              case null{

              };
            };

            let bondResult = await noBond(userName,friendName);
            if (bondResult == "no bond"){
              let emptyChats : Chats = { messages = List.nil<Message>()};
              let bond1 = await getUserID(userName);
              let bond2 = await getUserID(friendName);
              chatList.put(bond1#bond2,emptyChats);
              bondStatus := "bond added";
            }
            else{
              bondStatus := "bond exists already";
            };
            return "Freind Added" # bondStatus;
          };
          case true{
            return "Already Friend";
          };
        };
      };
      case null{
        return "no user";
      };
    };

  };

  public func noBond(userName : Text, friendName : Text) : async Text{

        let bondA = await getUserID(userName) ;
        let bondB = await getUserID(friendName);

        let combinedBond1 = bondA#bondB;
        let combinedBond2 = bondB#bondA;

        switch(chatList.get(combinedBond1)){
          case null{
            switch(chatList.get(combinedBond2)){
              case null{
                return "no bond";
              };
              case (?_){
                return "bond";
              };
            };
          };
          case (?_){
            return "bond";
          };
        };
  };

  public func removeFriend(userName: Text, friendName: Text) : async Text {

    func change(name : Text) : Bool{
      name != friendName;
    };

    func change1(name : Text) : Bool{
      name != userName;
    };

    switch (userList.get(userName)) {
      case (?user) {
        let updatedFriendList = List.filter<Text>(user.friendList,change);
        let newUser = {
          id = user.id;
          password = user.password;
          profilepic = user.profilepic;
          friendList = updatedFriendList;
        };
        let temp = userList.replace(userName, newUser);

        switch(userList.get(friendName)){
          case (?user1){
            let updatedUser1List = List.filter<Text>(user1.friendList,change1);
            let newUser1 = {
              id = user1.id;
              password = user1.password;
              profilepic = user1.profilepic;
              friendList = updatedUser1List;
            };
            let updatedFriend = userList.replace(friendName,newUser1);
          };
          case null{

          };
        };
        return "Success";
      };
      case null {
        return "User not found";
      };
    };
  };

  public func getUserID(userName : Text) : async Text{
    switch (userList.get(userName)){
        case (?user){
          return user.id;
        };
        case null {
          return "User not found";
        };
    };
  };

};