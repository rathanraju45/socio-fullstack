export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
    'createUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
