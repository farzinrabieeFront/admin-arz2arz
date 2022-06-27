import { LOGIN_USER, LOGOUT_USER, SET_USER_DATA } from "../actionTypes";

export const loginUserAction = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const setUserDataAction = (payload) => {
  return ({
    type: SET_USER_DATA,
    payload,
  })
};

export const logoutUserAction = () => {
  console.log('logoutUserAction');

  return {
    type: LOGOUT_USER,
  };
};
