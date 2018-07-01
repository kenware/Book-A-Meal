
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.menu, action) => {
  switch (action.type) {
    case types.LOAD_TODAY_MENU:
      return action.menu;
    default:
      return state;
  }
};
