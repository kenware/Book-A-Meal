import reducer from '../../../../redux/reducer/addToCart';
import * as types from '../../../../redux/Action/actionType';

describe('Add to Cart test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).cart).toEqual([]);
  });
  it('should return the initial state', () => {
    expect(reducer({ cart: [] }, {
      type: types.ADD_MEAL_TO_CART,
      cart: {
        mealId: 1,
        menuId: 2,
        quantity: 4
      }
    })).toEqual({
      cart: [{
        mealId: 1,
        menuId: 2,
        quantity: 4
      }]
    });
  });
});
