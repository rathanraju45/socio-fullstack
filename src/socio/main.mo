import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor Socio {

  type User = {
    password : Text;
  };

  var userList = HashMap.HashMap<Text, User>(5, Text.equal, Text.hash);

  stable var userListEntries : [(Text, User)] = [];

  system func preupgrade() {
    userListEntries := Iter.toArray(userList.entries());
  };

  system func postupgrade() {
    userList := HashMap.fromIter<Text, User>(userListEntries.vals(), 5, Text.equal, Text.hash);
    userListEntries := [];
  };

  public shared ({ caller }) func createUser(userName : Text, passWord : Text) : async Text{
  switch (userList.get(userName)) {
    case null {
      let newUser : User = { password = passWord };
      userList.put(userName, newUser);
      return "Account created";
    };
    case (?_) {
      return "User already exist";
    };
  };
};


  public query func checkUser(userName : Text, passWord : Text) : async Text {
    Debug.print(debug_show(userName,passWord));
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
};
