const setAuth = (token, username, userId, role, image) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('userId', userId);
  localStorage.setItem('image', image);
  return localStorage.setItem('role', role);
};
const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  localStorage.removeItem('image');
  return localStorage.removeItem('role');
};
const setRefresh = (token, image) => {
  localStorage.setItem('token', token);
  localStorage.setItem('image', image);
};
const getToken = () => localStorage.getItem('token');
const getRole = () => localStorage.getItem('role');
const getUsername = () => localStorage.getItem('username');
export default {
  setAuth,
  logOut,
  getToken,
  getRole,
  getUsername,
  setRefresh
};
