
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.notifics, action) => {
  switch (action.type) {
    case types.LOAD_NOTIFICATIONS:
      return action.notifics;
    default:
      return state;
  }
};
