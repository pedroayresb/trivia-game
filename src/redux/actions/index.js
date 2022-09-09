export const USER_LOGIN = 'USER_LOGIN';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_SCORE = 'USER_SCORE';

export const userLogin = (state) => ({
  type: USER_LOGIN,
  payload: state,
});

export const addToken = (state) => ({
  type: USER_TOKEN,
  payload: state,
});

export const addScore = (state) => ({
  type: USER_SCORE,
  payload: state,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=reques')
  .then((response) => response.json())
  .then((json) => dispatch(addToken(json)));
