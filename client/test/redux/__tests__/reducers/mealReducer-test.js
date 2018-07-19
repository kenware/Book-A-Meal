import reducer from '../../../../redux/reducer/mealsReducer';
import * as types from '../../../../redux/Action/actionType';

describe('MealReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ rows: [] });
  });

  it('should handle LOAD_ALL_MEALS', () => {
    expect(reducer([], {
      type: types.LOAD_ALL_MEALS,
      meals: {
        count: 1,
        rows: [{
          name: 'rice',
          price: 300,
          description: 'Good'
        }]
      }
    })).toEqual({
      count: 1,
      rows: [{
        name: 'rice',
        price: 300,
        description: 'Good'
      }]
    });
  });
});
