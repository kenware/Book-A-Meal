import reducer from '../../../../redux/reducer/errorReducer';
import * as types from '../../../../redux/Action/actionType';

describe('errorReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle LOAD_ERROR_MESSAGE', () => {
    expect(reducer([], {
      type: types.LOAD_ERROR_MESSAGE,
      errorMessage: 'Error loading meal'
    })).toEqual('Error loading meal');
  });
});
