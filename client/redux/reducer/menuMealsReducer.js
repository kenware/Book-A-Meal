
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.menuMeals, action) => {
  switch (action.type) {
    case types.LOAD_TODAY_MENUMEALS:
      return action.menuMeals;
    default:
      return state;
  }
};
