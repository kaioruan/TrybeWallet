import { USER_DATA } from '../reducers/user';

// Coloque aqui suas actions

export const SET_COIN_LIST = 'SET_COIN_LIST';
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
    // console.log(Object.entries(await result));
    const list = Object.keys(await result).filter((coin) => coin !== 'USDT');
    // console.log(list);
    dispatch(setCoinList(list));
  } catch (error) {
    // console.log(error);
  }
};
