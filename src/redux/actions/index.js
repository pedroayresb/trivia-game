export const USER_LOGIN = 'USER_LOGIN';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_SCORE = 'USER_SCORE';

export const userLogin = (state) => ({
  type: USER_LOGIN,
  payload: state,
});

export const addScore = (state) => ({
  type: USER_SCORE,
  payload: state,
});
