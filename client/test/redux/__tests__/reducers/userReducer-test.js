import reducer from '../../../../redux/reducer/userReducer';
import * as types from '../../../../redux/Action/actionType';

describe('userReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle LOAD_USER', () => {
    expect(reducer([], {
      type: types.LOAD_USER,
      user: {
        name: 'kelvin',
        username: 'kelvin',
        email: 'ken@gmail.com'
      }
    })).toEqual({
      name: 'kelvin',
      username: 'kelvin',
      email: 'ken@gmail.com'
    });
  });
});
