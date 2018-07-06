import reducer from '../../../../redux/reducer/notificsReducer';
import * as types from '../../../../redux/Action/actionType';

describe('notificsReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_NOTIFICATIONS', () => {
    expect(reducer([], {
      type: types.LOAD_NOTIFICATIONS,
      notifics: [{
        message: 'Today menu is set'
      }]
    })).toEqual([{
      message: 'Today menu is set'
    }]);
  });
});
