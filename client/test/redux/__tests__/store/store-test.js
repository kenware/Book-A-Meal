import store from '../../../../redux/store';

describe('allOrderReducer reducer', () => {
  it('should return the initial state', () => {
    expect(store()).toMatchSnapshot();
  });
});
