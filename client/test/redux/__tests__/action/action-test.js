import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/action';
import * as types from '../../../../redux/Action/actionType';

// import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// let auth = { getToken: jest.fn() };
describe('async actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should not create LOAD_NOTIFICATIONS when fetching notification with wrong token', () => {
    const notifics = { message: 'Please login!' };
    fetchMock
      .getOnce('/api/v1/notifications', { body: notifics });

    const expectedActions = [
      { type: types.LOAD_NOTIFICATIONS, notifics: [] }
    ];
    const store = mockStore({ notifics: [] });
    return store.dispatch(actions.getNotifications()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOAD_NOTIFICATIONS when fetching notification has been done', () => {
    const notifics = { message: ['today menu is set'] };
    fetchMock
      .getOnce('/api/v1/notifications', { body: notifics });

    const expectedActions = [
      { type: types.LOAD_NOTIFICATIONS, notifics }
    ];
    const store = mockStore({ notifics: [] });
    return store.dispatch(actions.getNotifications()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates LOAD_User when fetching user has been done', () => {
    const user = { message: ['do something'] };
    fetchMock
      .getOnce('/api/v1/auth/user', { body: user });

    const expectedActions = [
      { type: types.LOAD_USER, user }
    ];
    const store = mockStore({ mostOrder: [] });
    return store.dispatch(actions.getUser()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should fail to creates REGISTER_USER when fetching user has been done with invalid details', () => {
    const errorMessage = { message: 'error registering user' };
    fetchMock
      .post('/api/v1/auth/signup', { body: errorMessage });

    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { registerError: 'error registering user' } }
    ];
    const store = mockStore([]);
    return store.dispatch(actions.register()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should REGISTER_USER when fetching user has been done', () => {
    global.history.pushState = jest.fn();
    const user = { name: 'ken', email: 'ken@gmail.com' };
    fetchMock
      .post('/api/v1/auth/signup', { body: user });

    const store = mockStore({ user: [] });
    return store.dispatch(actions.register()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should REGISTER_USER when fetching user has been done and redirect to admin', () => {
    global.history.pushState = jest.fn();
    const user = { name: 'ken', email: 'ken@gmail.com', role: 'admin' };
    fetchMock
      .post('/api/v1/auth/signup', { body: user });

    const store = mockStore({ user: [] });
    return store.dispatch(actions.register()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should LOGIN_USER when fetching user has been done and login normal user', () => {
    global.history.pushState = jest.fn();
    const user = { username: 'ken', password: 'ken@gmail.com' };
    fetchMock
      .post('/api/v1/auth/signin', { body: user });

    const store = mockStore({ user: [] });
    return store.dispatch(actions.login()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should LOGIN_USER when fetching user has been done and login caterer', () => {
    global.history.pushState = jest.fn();
    const user = { username: 'ken', password: 'ken@gmail.com', role: 'admin' };
    fetchMock
      .post('/api/v1/auth/signin', { body: user });

    const store = mockStore({ user: [] });
    return store.dispatch(actions.login()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should not LOGIN_USER with invalid detail', () => {
    const user = { message: 'Wrong details', role: 'admin' };
    fetchMock
      .post('/api/v1/auth/signin', { body: user });

    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { loginError: 'Wrong details' } }
    ];

    const store = mockStore({ user: [] });
    return store.dispatch(actions.login()).then(() => {
      // return of async actions
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
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should refresh token and redirect to dashbored for role user', () => {
    const token = { token: '1234gdjjj4jjiu98u' };
    const data = { role: 'user' };
    fetchMock
      .get('/api/v1/refresh', { headers: { authorization: token }, body: data });

    const store = mockStore({ user: [] });
    store.dispatch(actions.refreshToken('admin')).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
    store.dispatch(actions.refreshToken('user')).then(() => {
      // return of async actions
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
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should upgrade normal user to admin', () => {
    const data = { setAdmin: { token: 'token', username: 'username' } };
    fetchMock
      .post('/api/v1/auth/admin', { body: data });

    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { upgradeSuccess: 'Upgrade successfull' } }
    ];

    const store = mockStore({ upgrade: [] });
    return store.dispatch(actions.upgrade()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not update user profile with wrong credential and LOAD_ERROR_MESSAGE', () => {
    const data = { message: 'Could not update profile' };
    fetchMock
      .post('/api/v1/auth/update', { body: data });

    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { updateError: 'Could not update profile' } }
    ];

    const store = mockStore({ update: [] });
    return store.dispatch(actions.updateProfile()).then(() => {
      // return of async actions
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
      // return of async actions
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
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should send restlink to user', () => {
    const payload = { link: 'link_url' };
    fetchMock
      .post('/api/v1/auth/resetLink', { body: payload });
    const store = mockStore({ link: [] });
    return store.dispatch(actions.resetLink()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
  });
  it('should clear all messages', () => {
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: {} }
    ];

    const store = mockStore({ message: [] });
    return store.dispatch(actions.clearMessages(), () => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
