
import * as types from './actionType';
import auth from '../../authenticate/auth';
import history from '../../history';

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadNotifications = notifics => ({ type: types.LOAD_NOTIFICATIONS, notifics });
export const loadUser = user => ({ type: types.LOAD_USER, user });

export const loadMostOrderedMeal = () => dispatch => window.fetch('/api/v1/mostOrder/meals/6')
  .then(res => res.json())
  .then(mostOrder =>
    dispatch(loadMostOrdered(mostOrder)));

export const register = (name, username, email, password) => dispatch => window.fetch('/api/v1/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    password,
    name,
    username
  })
})
  .then(res => res.json())
  .then((res) => {
    if (res.message) {
      return dispatch(loadErrorMessage({ registerError: res.message }));
    }
    auth.setAuth(res.token, res.username, res.id, res.role, res.image);
    if (res.role === 'admin') {
      return history.push('/admin');
    }
    return history.push('/dashboard');
  });

export const login = (username, password) => dispatch => window.fetch('/api/v1/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    password,
    username
  })
})
  .then(res => res.json())
  .then((response) => {
    if (!response.username) {
      return dispatch(loadErrorMessage({ loginError: response.message }));
    }
    auth.setAuth(response.token, response.username, response.id, response.role, response.image);
    if (response.role === 'admin') {
      return history.push('/admin');
    }
    history.push('/dashboard');
  });

export const getNotifications = () => dispatch => window.fetch('/api/v1/notifications', {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((notifics) => {
    if (notifics.message === 'Unauthorized Access' || notifics.message === 'Please login!') {
      return dispatch(loadNotifications([]));
    }
    return dispatch(loadNotifications(notifics));
  });

export const refreshToken = role => dispatch => window.fetch('/api/v1/refresh', {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((newUser) => {
    if (newUser.message) {
      dispatch(loadErrorMessage({ authError: newUser.message }));
      auth.logOut();
      return history.push('/login');
    }
    if (newUser.role === 'user' && newUser.role !== role) {
      auth.setRefresh(newUser.token);
      return history.push('/dashboard');
    }
    auth.setRefresh(newUser.token);
  });
export const upgrade = () => dispatch => window.fetch('/api/v1/auth/admin', {
  method: 'POST',
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((res) => {
    if (!res.setAdmin) {
      return dispatch(loadErrorMessage({ upgradeError: res.message }));
    }
    auth.logOut();
    const {
      username, id, role, image
    } = res.setAdmin;
    auth.setAuth(res.token, username, id, role, image);
    dispatch(loadSuccessMessage({ upgradeSuccess: 'Upgrade successfull' }));
  });

export const clearMessages = () => (dispatch) => {
  dispatch(loadErrorMessage({}));
  dispatch(loadSuccessMessage({}));
};

export const getUser = () => dispatch => window.fetch('/api/v1/auth/user', {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then(user => dispatch(loadUser(user)));

export const updateProfile = payload => dispatch => window.fetch('/api/v1/auth/update', {
  headers: {
    authorization: auth.getToken()
  },
  method: 'POST',
  body: payload
})
  .then(res => res.json())
  .then((user) => {
    if (user.message) {
      return dispatch(loadErrorMessage({ updateError: user.message }));
    }
    window.localStorage.removeItem('image');
    window.localStorage.setItem('image', user.image);
    getUser();
    dispatch(loadSuccessMessage({ updateSuccess: 'User updated!' }));
  });
export const resetLink = emailOrUsername => dispatch => window.fetch('/api/v1/auth/resetLink', {
  headers: {
    authorization: auth.getToken(),
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    emailOrUsername
  })
})
  .then(res => res.json())
  .then((link) => {
    if (!link.success) {
      return dispatch(loadErrorMessage({ resetError: link.message }));
    }
    return dispatch(loadSuccessMessage({ resetSuccess: 'Reset Link sent to your email. Please check your inbox and spam email.' }));
  });

export const changePassword = (password, token) => dispatch => window.fetch('/api/v1/auth/reset', {
  method: 'POST',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    password
  })
})
  .then(res => res.json())
  .then((response) => {
    const { user } = response;
    if (!response.success) {
      return dispatch(loadErrorMessage({ passwordResetError: response.message }));
    }
    dispatch(loadSuccessMessage({ passwordSuccess: 'password successfully changed' }));
    auth.setAuth(token, user.username, user.id, user.role, user.image);
  });
