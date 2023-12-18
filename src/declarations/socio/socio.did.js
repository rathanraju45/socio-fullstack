export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Message = IDL.Record({
    'id' : IDL.Text,
    'sender' : IDL.Text,
    'message' : IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(Message, List)));
  const Messages = IDL.Opt(IDL.Tuple(Message, List));
  const Chats = IDL.Record({ 'messages' : Messages });
  return IDL.Service({
    'addFriend' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'addMessage' : IDL.Func(
        [IDL.Text, IDL.Text, Message],
        [IDL.Opt(Chats)],
        [],
      ),
    'checkUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
    'createUser' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'getDP' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'getFriendsList' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getMessages' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Vec(Message)],
        ['query'],
      ),
    'getPublicUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], []),
    'getUserID' : IDL.Func([IDL.Text], [IDL.Text], []),
    'noBond' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'removeFriend' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'wipeData' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
