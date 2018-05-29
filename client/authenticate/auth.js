const setAuth = (token, username, userId) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('userId', userId);
};
const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
};
const getToken = () => localStorage.getItem('token');
export default { setAuth, logOut, getToken };
