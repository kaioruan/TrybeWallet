import { SET_COIN_LIST } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export const WALLET_DATA = 'WALLET_DATA';

const setUserData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_DATA:
    return {
      ...state,
      expenses: action.payload,
    };
  case SET_COIN_LIST:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default setUserData;
