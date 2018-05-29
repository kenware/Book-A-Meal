
import * as types from './actionType';
import auth from '../../authenticate/auth';
import history from '../../history';

const token = auth.getToken();

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadAllMeals = meals => ({ type: types.LOAD_ALL_MEALS, meals });

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
      username,
      role: 'admin'
    })
  })
    .then(res => res.json())
    .then((response) => {
      if (response.message) {
        return dispatch(loadErrorMessage({ registerError: response.message }));
      }
      auth.setAuth(response.token, response.username, response.id);
      return history.push('/admin');
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
      auth.setAuth(response.token, response.username, response.id);
      return history.push('/admin');
    });
};

export const getAllMeals = () => (dispatch) => {
  fetch('/api/v1/meals', {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then(meals => dispatch(loadAllMeals(meals)));
};

export const createMeal = payload => (dispatch) => {
  fetch('/api/v1/meals', {
    method: 'POST',
    headers: {
      authorization: token
    },
    body: payload
  })
    .then(res => res.json())
    .then((response) => {
      if (response.message) {
        return dispatch(loadErrorMessage({ createMealError: response.message }));
      }
      dispatch(getAllMeals());
      dispatch(loadSuccessMessage({ createMealSuccess: 'Meal Successfully Created' }));
      // return history.push('/dashboard');
    });
};
export const deleteMeal = id => (dispatch) => {
  fetch(`/api/v1/meals/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((meals) => {
      dispatch(loadSuccessMessage(meals));
      dispatch(getAllMeals());
    });
};
export const updateMeal = (id, payload) => (dispatch) => {
  fetch(`/api/v1/meals/${id}`, {
    method: 'PUT',
    headers: {
      authorization: token
    },
    body: payload
  })
    .then(res => res.json())
    .then((response) => {
      if (response.message) {
        return dispatch(loadErrorMessage({ updateMealError: response.message }));
      }
      dispatch(getAllMeals());
      return dispatch(loadSuccessMessage({ updateMealSuccess: 'Meal Successfully Updated' }));
      
      // return history.push('/dashboard');
    });
};
