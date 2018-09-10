import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/action';
import * as types from '../../../../redux/Action/actionType';
import { actionMock } from '../../reduxMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch empty notification on LOAD_NOTIFICATIONS action type with wrong details', () => {
    const notifics = actionMock.notifics.error;
    fetchMock
      .getOnce('/api/v1/notifications', { body: notifics });
    const expectedActions = [
      { type: types.LOAD_NOTIFICATIONS, notifics: [] }
    ];
    const store = mockStore({ notifics: [] });
    return store.dispatch(actions.getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch notification on LOAD_NOTIFICATIONS action type when fetching notification has been done', () => {
    const notifics = actionMock.notifics.success;
    fetchMock
      .getOnce('/api/v1/notifications', { body: notifics });
    const expectedActions = [
      { type: types.LOAD_NOTIFICATIONS, notifics }
    ];
    const store = mockStore({ notifics: [] });
    return store.dispatch(actions.getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch a user on LOAD_USER action type on user request', () => {
    const { user } = actionMock;
    fetchMock
      .getOnce('/api/v1/auth/user', { body: user });
    const expectedActions = [
      { type: types.LOAD_USER, user }
    ];
    const store = mockStore({ mostOrder: [] });
    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch error message on REGISTER_USER action type with invalid details', () => {
    const { errorMessage } = actionMock;
    fetchMock
      .post('/api/v1/auth/signup', { body: errorMessage });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { registerError: 'error registering user' } }
    ];
    const store = mockStore([]);
    return store.dispatch(actions.register()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch REGISTER_USER action type when fetching user has been done', () => {
    global.history.pushState = jest.fn();
    const { user } = actionMock;
    fetchMock
      .post('/api/v1/auth/signup', { body: user });
    const store = mockStore({ user: [] });
    return store.dispatch(actions.register()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch REGISTER_USER action type with successful register with admin privilege', () => {
    global.history.pushState = jest.fn();
    const user = actionMock.adminUser;
    fetchMock
      .post('/api/v1/auth/signup', { body: user });
    const store = mockStore({ user: [] });
    return store.dispatch(actions.register()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch LOGIN_USER action type on successful login', () => {
    global.history.pushState = jest.fn();
    const { user } = actionMock;
    fetchMock
      .post('/api/v1/auth/signin', { body: user });
    const store = mockStore({ user: [] });
    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch LOGIN_USER action type with caterer privilege', () => {
    global.history.pushState = jest.fn();
    const user = actionMock.adminUser;
    fetchMock
      .post('/api/v1/auth/signin', { body: user });
    const store = mockStore({ user: [] });
    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should not LOGIN_USER with invalid detail', () => {
    const errorResponse = actionMock.loginerror;
    fetchMock
      .post('/api/v1/auth/signin', { body: errorResponse });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { loginError: 'Wrong details' } }
    ];
    const store = mockStore({ user: [] });
    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not refresh token if it is expired or do not exist', () => {
    const token = { token: '1234gdjjj4jjiu98u' };
    const data = { message: 'Your Session Expired' };
    fetchMock
      .get('/api/v1/refresh', { headers: { authorization: token }, body: data });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { authError: 'Your Session Expired' } }
    ];
    const store = mockStore({ user: [] });
    return store.dispatch(actions.refreshToken()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should refresh token and redirect to dashbored for role user', () => {
    const { token } = actionMock;
    const data = actionMock.user;
    fetchMock
      .get('/api/v1/refresh', { headers: { authorization: token }, body: data });
    const store = mockStore({ user: [] });
    store.dispatch(actions.refreshToken('admin')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
    store.dispatch(actions.refreshToken('user')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should not upgrade user that is not authenticated to admin', () => {
    const data = { message: 'Could not uprade to admin' };
    fetchMock
      .post('/api/v1/auth/admin', { body: data });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { upgradeError: 'Could not uprade to admin' } }
    ];
    const store = mockStore({ upgrade: [] });
    return store.dispatch(actions.upgrade()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should upgrade normal user to admin', () => {
    const data = actionMock.userUpgrade;
    fetchMock
      .post('/api/v1/auth/admin', { body: data });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { upgradeSuccess: 'Upgrade successfull' } }
    ];
    const store = mockStore({ upgrade: [] });
    return store.dispatch(actions.upgrade()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch LOAD_ERROR_MESSAGE action type when updating user profile with wrong credential', () => {
    const data = { message: 'Could not update profile' };
    fetchMock
      .post('/api/v1/auth/update', { body: data });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { updateError: 'Could not update profile' } }
    ];
    const store = mockStore({ update: [] });
    return store.dispatch(actions.updateProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should update user profile and LOAD_SUCCESS_MESSAGE', () => {
    const data = { image: 'image_url' };
    fetchMock
      .post('/api/v1/auth/update', { body: data });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { updateSuccess: 'User updated!' } }
    ];
    const store = mockStore({ update: [] });
    return store.dispatch(actions.updateProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not send restlink on wrong user detail and LOAD_ERROR_MESSAGE', () => {
    const wrongData = { message: 'Wrong detail' };
    fetchMock
      .post('/api/v1/auth/resetLink', { body: wrongData });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { resetError: 'Wrong detail' } }
    ];
    const store = mockStore({ link: [] });
    return store.dispatch(actions.resetLink()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should send restlink to user', () => {
    const payload = { link: 'link_url' };
    fetchMock
      .post('/api/v1/auth/resetLink', { body: payload });
    const store = mockStore({ link: [] });
    return store.dispatch(actions.resetLink()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should clear all errorMessages', () => {
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: {} }
    ];
    const store = mockStore({ message: [] });
    return store.dispatch(actions.clearMessages(), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
