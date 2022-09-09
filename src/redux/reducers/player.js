import { USER_LOGIN, USER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };
  case USER_SCORE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default player;
