// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
};

export const USER_DATA = 'USER_DATA';

const setUserData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default setUserData;
