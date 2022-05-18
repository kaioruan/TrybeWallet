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
  case WALLET_DATA: return ({
    ...state,
    currencies: action.payload.currencies,
    expenses: action.payload.expenses,
  });
  default:
    return state;
  }
};

export default setUserData;
