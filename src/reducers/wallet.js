import { SET_COIN_LIST, SET_DELETE_ITEM } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export const WALLET_DATA = 'WALLET_DATA';
export const FETCH_DATA = 'FETCH_DATA';

const setUserData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_DATA:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.payload,
        exchangeRates: action.currencies,
      }],
    };
  case SET_COIN_LIST:
    return {
      ...state,
      currencies: action.payload,
    };
  case SET_DELETE_ITEM:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default setUserData;
