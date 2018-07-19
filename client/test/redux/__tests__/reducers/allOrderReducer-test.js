import allOrder from '../../../../redux/reducer/rootReducer';
import * as types from '../../../../redux/Action/actionType';

const reducer = allOrder;
describe('allOrderReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer().allOrder(undefined, {})).toEqual([]);
  });

  it('should handle ADD_TODO', () => {
    expect(reducer().allOrder([], {
      type: types.LOAD_ALL_ORDER,
      allOrder: [{
        quantity: 3,
        totalPrice: 4556,
        meal: {
          name: 'rice',
          price: 234,
          description: 'good'
        }
      }]
    })).toEqual([
      {
        quantity: 3,
        totalPrice: 4556,
        meal: {
          name: 'rice',
          price: 234,
          description: 'good'
        }
      }
    ]);
  });
});
