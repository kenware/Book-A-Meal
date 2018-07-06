
const setAuth = (token, username, userId, role, image) => {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('userId', userId);
  window.localStorage.setItem('image', image);
  return window.localStorage.setItem('role', role);
};

const logOut = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('username');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('image');
  return window.localStorage.removeItem('role');
};

const setRefresh = (token) => {
  window.localStorage.setItem('token', token);
};
const setImage = image => window.localStorage.setItem('image', image);
const getToken = () => window.localStorage.getItem('token');
const getRole = () => window.localStorage.getItem('role');
const getUsername = () => window.localStorage.getItem('username');

export default {
  setAuth,
  logOut,
  getToken,
  getRole,
  getUsername,
  setRefresh,
  setImage
};
