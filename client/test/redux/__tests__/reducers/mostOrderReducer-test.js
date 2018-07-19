import reducer from '../../../../redux/reducer/mostOrderReducer';
import * as types from '../../../../redux/Action/actionType';

describe('mostOrderReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_MOST_ORDERED meals', () => {
    expect(reducer([], {
      type: types.LOAD_MOST_ORDERED,
      mostOrder: [{
        count: 1,
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
      count: 1,
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
