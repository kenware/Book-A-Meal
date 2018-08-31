
import * as types from './actionType';
import auth from '../../authenticate/auth';

export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });

export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});

export const loadTodayMenu = menu => ({ type: types.LOAD_TODAY_MENU, menu });

export const loadTodayMenuMeals = menuMeals => ({ type: types.LOAD_TODAY_MENUMEALS, menuMeals });
export const addMealToCart = cart => ({ type: types.ADD_MEAL_TO_CART, cart });

export const setMenu = (meals, title, orderBefore, sendEmail) => dispatch => window.fetch('/api/v1/menu', {
  method: 'POST',
  headers: {
    authorization: auth.getToken(),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    meals, title, orderBefore, sendEmail
  })
})
  .then(res => res.json())
  .then((response) => {
    if (!response.menu) {
      return dispatch(loadErrorMessage({ setMenuError: response.message }));
    }
    return dispatch(loadSuccessMessage({ setMenuSuccess: 'Meal added to menu' }));
  });

export const getMenu = (limit, offset) => dispatch => window.fetch(`/api/v1/menu?limit=${limit}&offset=${offset}`, {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((menu) => {
    if (menu.message) {
      return dispatch(loadErrorMessage({ getMenuError: 'Todays Menu is not set yet' }));
    }
    dispatch(loadTodayMenu(menu));
  });

export const getMenuMeals = (url, limit, offset) => dispatch => window.fetch(`${url}?limit=${limit}&offset=${offset}`, {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((menuMeals) => {
    if (menuMeals.message) {
      return dispatch(loadErrorMessage({ getMenuMealsError: 'Error fetching meals' }));
    }
    dispatch(loadTodayMenuMeals(menuMeals));
  });

export const clearMenuMeals = () => dispatch => dispatch(loadTodayMenuMeals({ meals: [] }));

export const addToCart = meals => dispatch => dispatch(addMealToCart(meals));
