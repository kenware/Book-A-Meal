import * as types from '../Action/actionType';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MEAL_TO_CART:
      return {
        cart: [...state.cart, action.cart]
      };
    default:
      return state;
  }
};
