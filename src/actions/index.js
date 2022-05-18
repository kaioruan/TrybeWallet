import { USER_DATA } from '../reducers/user';

// Coloque aqui suas actions

const saveUserEmail = (email) => ({
  type: USER_DATA,
  payload: email,
});

export default saveUserEmail;
