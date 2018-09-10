
import * as types from './actionType';
import auth from '../../authenticate/auth';

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadAllMeals = meals => ({ type: types.LOAD_ALL_MEALS, meals });

export const loadMostOrderedMeal = limit => dispatch => window.fetch(`/api/v1/mostOrder/meals?limit=${limit}`)
  .then(res => res.json())
  .then(mostOrder =>
    dispatch(loadMostOrdered(mostOrder)));

export const getAllMeals = (limit, offset) => dispatch => window.fetch(`/api/v1/meals?limit=${limit}&offset=${offset}`, {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((meals) => {
    if (!meals.message) {
      return dispatch(loadAllMeals(meals));
    }
    return dispatch(loadAllMeals({ rows: [], count: 0 }));
  });

export const createMeal = payload => dispatch => window.fetch('/api/v1/meals', {
  method: 'POST',
  headers: {
    authorization: auth.getToken()
  },
  body: payload
})
  .then(res => res.json())
  .then((response) => {
    if (response.message) {
      return dispatch(loadErrorMessage({ createMealError: response.message }));
    }
    dispatch(getAllMeals(6, 0));
    dispatch(loadSuccessMessage({ createMealSuccess: 'Meal Successfully Created' }));
  });

export const deleteMeal = id => dispatch => window.fetch(`/api/v1/meals/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((meals) => {
    dispatch(loadSuccessMessage(meals));
    dispatch(getAllMeals(6, 0));
  });

export const updateMeal = (id, payload) => dispatch => window.fetch(`/api/v1/meals/${id}`, {
  method: 'PUT',
  headers: {
    authorization: auth.getToken()
  },
  body: payload
})
  .then(res => res.json())
  .then((response) => {
    if (response.message) {
      return dispatch(loadErrorMessage({ updateMealError: response.message }));
    }
    dispatch(getAllMeals(6, 0));
    return dispatch(loadSuccessMessage({ updateMealSuccess: 'Meal Successfully Updated' }));
  });
