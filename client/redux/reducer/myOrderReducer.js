
import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState.myOrder, action) => {
  switch (action.type) {
    case types.LOAD_MY_ORDER:
      return action.myOrder;
    default:
      return state;
  }
};
