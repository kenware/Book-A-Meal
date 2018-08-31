import reducer from '../../../../redux/reducer/menuMealsReducer';
import * as types from '../../../../redux/Action/actionType';

describe('menu MealReducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ meals: [] });
  });

  it('should handle LOAD_TODAY_MENUMEALS', () => {
    expect(reducer([], {
      type: types.LOAD_TODAY_MENUMEALS,
      menuMeals: {
        count: 1,
        meals: [{
          name: 'rice',
          price: 300,
          description: 'Good'
        }]
      }
    })).toEqual({
      count: 1,
      meals: [{
        name: 'rice',
        price: 300,
        description: 'Good'
      }]
    });
  });
});
