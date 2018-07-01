import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.errorMessage, action) => {
  switch (action.type) {
    case types.LOAD_ERROR_MESSAGE:
      return action.errorMessage;
    default:
      return state;
  }
};
