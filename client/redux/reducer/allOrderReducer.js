
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.allOrder, action) => {
  switch (action.type) {
    case types.LOAD_ALL_ORDER:
      return action.allOrder;
    default:
      return state;
  }
};
