
import * as types from './actionType';
import auth from '../../authenticate/auth';

//const token = auth.getToken();
const token = localStorage.getItem('token');
export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadTodayMenu = menu => ({ type: types.LOAD_TODAY_MENU, menu });

export const setMenu = (mealId, title, orderBefore) => (dispatch) => {
  fetch('/api/v1/menu', {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mealId, title, orderBefore
    })
  })
    .then(res => res.json())
    .then((response) => {
      if (!response.menu) {
        return dispatch(loadErrorMessage({ setMenuError: response.message }));
      }
      return dispatch(loadSuccessMessage({ setMenuSuccess: 'Meal added to menu' }));
      // return history.push('/dashboard');
    });
};
export const getMenu = () => (dispatch) => {
  fetch('/api/v1/menu', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then((menu) => {
      if (menu.message) {
        dispatch(loadTodayMenu([]));
        return dispatch(loadErrorMessage({ getMenuError: 'Todays Menu is not set yet' }));
      }
      dispatch(loadTodayMenu(menu));

    });
};
