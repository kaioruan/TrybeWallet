import { USER_DATA } from '../reducers/user';
import { WALLET_DATA } from '../reducers/wallet';

// Coloque aqui suas actions

export const SET_COIN_LIST = 'SET_COIN_LIST';
export const SET_DELETE_ITEM = 'SET_DELETE_ITEM';
export const saveUserEmail = (email) => ({
  type: USER_DATA,
  payload: email,
});

export const setCoinList = (coin) => ({
  type: SET_COIN_LIST,
  payload: coin,
});

export const fetchCoin = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const list = Object.keys(await result).filter((coin) => coin !== 'USDT');
    dispatch(setCoinList(list));
  } catch (error) {
    // console.log(error);
  }
};

export const setExpenseList = (payload, currencies) => ({
  type: WALLET_DATA,
  payload,
  currencies,
});

export const fetchExpense = (payload) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    dispatch(setExpenseList(payload, currencies));
  } catch (error) {
    // console.log(error);
  }
};

export const deleteItem = (list) => ({
  type: SET_DELETE_ITEM,
  payload: list,
});
