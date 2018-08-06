import reducer from '../../../../redux/reducer/rootReducer';
import * as types from '../../../../redux/Action/actionType';

describe('allOrderReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}).allOrder).toEqual({ orders: [] });
  });

  it('should handle allOrderReducer', () => {
    expect(reducer({}, {
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
    }).allOrder).toEqual([
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
