const auth = {
  isLogin: true,
  user: {},
};

const AuthReducer = (state = auth, action) => {
  switch (action.type) {
    case 'LOGIN':
      // delete action.type;
      return {
        isLogin: true,
        user: action,
      };
    case 'LOGOUT':
      return { isLogin: false };
    case 'UPDATE':
      // delete action.type;
      return {
        ...state,
        ...action,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
