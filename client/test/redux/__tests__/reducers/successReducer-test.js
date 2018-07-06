import reducer from '../../../../redux/reducer/successReducer';
import * as types from '../../../../redux/Action/actionType';

describe('successReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle LOAD_SUCCESS_MESSAGE', () => {
    expect(reducer([], {
      type: types.LOAD_SUCCESS_MESSAGE,
      successMessage: 'Meal added'
    })).toEqual('Meal added');
  });
});
