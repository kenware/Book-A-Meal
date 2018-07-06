import reducer from '../../../../redux/reducer/myOrderReducer';
import * as types from '../../../../redux/Action/actionType';

describe('MealReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_MY_ORDER', () => {
    expect(reducer([], {
      type: types.LOAD_MY_ORDER,
      myOrder: [{
        title: 'Todays menu',
        meals: [
          {
            name: 'rice',
            price: 300,
            description: 'Good'
          }
        ]
      }]
    })).toEqual([{
      title: 'Todays menu',
      meals: [
        {
          name: 'rice',
          price: 300,
          description: 'Good'
        }
      ]
    }]);
  });
});
