import type { Principal } from '@dfinity/principal';
export interface Chats { 'messages' : Messages }
export type List = [] | [[Message, List]];
export interface Message {
  'id' : string,
  'sender' : string,
  'message' : string,
}
export type Messages = [] | [[Message, List]];
export interface _SERVICE {
  'addFriend' : (arg_0: string, arg_1: string) => Promise<string>,
  'addMessage' : (arg_0: string, arg_1: string, arg_2: Message) => Promise<
      [] | [Chats]
    >,
  'checkUser' : (arg_0: string, arg_1: string) => Promise<string>,
  'createUser' : (arg_0: string, arg_1: string, arg_2: string) => Promise<
      string
    >,
  'getDP' : (arg_0: string) => Promise<string>,
  'getFriendsList' : (arg_0: string) => Promise<Array<string>>,
  'getMessages' : (arg_0: string, arg_1: string) => Promise<Array<Message>>,
  'getPublicUsers' : () => Promise<Array<string>>,
  'getUserID' : (arg_0: string) => Promise<string>,
  'noBond' : (arg_0: string, arg_1: string) => Promise<string>,
  'removeFriend' : (arg_0: string, arg_1: string) => Promise<string>,
  'wipeData' : () => Promise<string>,
}
