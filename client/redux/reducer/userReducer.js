
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case types.LOAD_USER:
      return action.user;
    default:
      return state;
  }
};
