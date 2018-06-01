
import * as types from './actionType';
import auth from '../../authenticate/auth';
import history from '../../history';

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadAllMeals = meals => ({ type: types.LOAD_ALL_MEALS, meals });
export const loadNotifications = notifics => ({ type: types.LOAD_NOTIFICATIONS, notifics });
export const loadUser = user => ({ type: types.LOAD_USER, user });

export const loadMostOrderedMeal = () => (dispatch) => {
  fetch('/api/v1/mostOrder/meals/6')
    .then(res => res.json())
    .then(mostOrder =>
      dispatch(loadMostOrdered(mostOrder)));
};

export const register = (name, username, email, password) => (dispatch) => {
  fetch('/api/v1/auth/signup', {
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
};

export const login = (username, password) => (dispatch) => {
  fetch('/api/v1/auth/signin', {
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
};
export const getNotifications = () => (dispatch) => {
  fetch('/api/v1/notifications', {
    headers: {
      authorization: auth.getToken()
    }
  })
    .then(res => res.json())
    .then(notifics => dispatch(loadNotifications(notifics)));
};
export const refreshToken = role => (dispatch) => {
  fetch('/api/v1/refresh', {
    headers: {
      authorization: auth.getToken()
    }
  })
    .then(res => res.json())
    .then((newUser) => {
      if (newUser.message) {
        dispatch(loadErrorMessage({ authError: 'Your Session Expired, Please Login' }));
        return history.push('/login');
      }
      if (newUser.role === 'user' && newUser.role !== role) {
        auth.setRefresh(newUser.token, newUser.image);
        return history.push('/dashboard');
      }
      auth.setRefresh(newUser.token, newUser.image);
    });
};
export const upgrade = () => (dispatch) => {
  fetch('/api/v1/auth/admin', {
    method: 'POST',
    headers: {
      authorization: auth.getToken()
    }
  })
    .then(res => res.json())
    .then((upgrade) => {
      if (!upgrade.setAdmin) {
        return dispatch(loadErrorMessage({ upgradeError: upgrade.message }));
      }
      localStorage.setItem('role', upgrade.setAdmin.role);
      dispatch(loadSuccessMessage({ upgradeSuccess: 'Upgrade successfull' }));
    });
};
export const clearMessages = () => (dispatch) => {
  dispatch(loadErrorMessage([]));
  dispatch(loadSuccessMessage([]));

};

export const getUser = () => (dispatch) => {
  fetch('/api/v1/auth/user', {
    headers: {
      authorization: auth.getToken()
    }
  })
    .then(res => res.json())
    .then(user => dispatch(loadUser(user)));
};
