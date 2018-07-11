
import * as types from './actionType';
import auth from '../../authenticate/auth';

export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadTodayMenu = menu => ({ type: types.LOAD_TODAY_MENU, menu });

export const setMenu = (mealId, title, orderBefore) => dispatch => window.fetch('/api/v1/menu', {
  method: 'POST',
  headers: {
    authorization: auth.getToken(),
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

export const getMenu = (limit, offset) => dispatch => window.fetch(`/api/v1/menu?limit=${limit}&offset=${offset}`, {
  headers: {
    authorization: auth.getToken()
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

