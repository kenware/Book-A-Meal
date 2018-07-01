
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.mostOrder, action) => {
  switch (action.type) {
    case types.LOAD_MOST_ORDERED:
      return action.mostOrder;
    default:
      return state;
  }
};
