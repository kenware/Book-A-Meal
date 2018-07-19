import reducer from '../../../../redux/reducer/menuReducer';
import * as types from '../../../../redux/Action/actionType';

describe('MealReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_ALL_MEALS', () => {
    expect(reducer([], {
      type: types.LOAD_TODAY_MENU,
      menu: [{
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
