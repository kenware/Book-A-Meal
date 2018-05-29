import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.successMessage, action) => {
  switch (action.type) {
    case types.LOAD_SUCCESS_MESSAGE:
      return action.successMessage;
    default:
      return state;
  }
};
