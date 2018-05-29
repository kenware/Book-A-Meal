
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.meals, action) => {
  switch (action.type) {
    case types.LOAD_ALL_MEALS:
      return action.meals;
    default:
      return state;
  }
};
