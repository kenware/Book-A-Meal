import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/menuAction';
import * as types from '../../../../redux/Action/actionType';
import { menuActionMock } from '../../reduxMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should  LOAD_ERROR_MESSAGE with unauthenticated user with setMenu action ', () => {
    const { message } = menuActionMock;
    fetchMock
      .post('/api/v1/menu', { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { setMenuError: message.message } }
    ];
    const store = mockStore({ menu: [] });
    return store.dispatch(actions.setMenu()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch LOAD_SUCCESS_MESSAGE action type when today menu is set', () => {
    const response = menuActionMock.menu;
    fetchMock
      .post('/api/v1/menu', { body: response });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { setMenuSuccess: 'Meal added to menu' } }
    ];
    const store = mockStore({ menu: [] });
    return store.dispatch(actions.setMenu()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE with unauthenticated user with getMenu action ', () => {
    const limit = 6, offset = 0;
    const { message } = menuActionMock;
    fetchMock
      .get(`/api/v1/menu?limit=${limit}&offset=${offset}`, { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { getMenuError: 'Todays Menu is not set yet' } }
    ];
    const store = mockStore({ menu: [] });
    return store.dispatch(actions.getMenu(limit, offset)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE with authenticated user ON getMenu action ', () => {
    const response = menuActionMock.getMenu;
    const limit = 6, offset = 0;
    fetchMock
      .get(`/api/v1/menu?limit=${limit}&offset=${offset}`, { body: response });
    const expectedActions = [
      { type: types.LOAD_TODAY_MENU, menu: response }
    ];
    const store = mockStore({ menu: [] });
    return store.dispatch(actions.getMenu(limit, offset)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
