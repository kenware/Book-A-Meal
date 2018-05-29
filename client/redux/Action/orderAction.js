
import * as types from './actionType';
import auth from '../../authenticate/auth';

const token = auth.getToken();

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadTodayMenu = menu => ({ type: types.LOAD_TODAY_MENU, menu });
export const loadMyOrder = myOrder => ({ type: types.LOAD_MY_ORDER, myOrder });
export const loadAllOrder = allOrder => ({ type: types.LOAD_ALL_ORDER, allOrder });

export const orderMeal = (mealId, menuId, address, quantity) => (dispatch) => {
  fetch('/api/v1/orders', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mealId, menuId, address, quantity
    })
  })
    .then(res => res.json())
    .then((response) => {
      if (!response.status) {
        return dispatch(loadErrorMessage({ orderError: response.message }));
      }
      return dispatch(loadSuccessMessage({ orderSuccess: 'Order created' }));
      // return history.push('/dashboard');
    });
};
export const getMyOrder = () => (dispatch) => {
  fetch('/api/v1/user/orders', {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((myOrder) => {
      if (myOrder.message) {
        return dispatch(loadErrorMessage({
          myOrderError: 'OOps You Have Not Ordered A Meal'
        }));
      }
      dispatch(loadMyOrder(myOrder));
    });
};
export const getAllOrders = () => (dispatch) => {
  fetch('/api/v1/orders', {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((allOrder) => {
      if (allOrder.message) {
        return dispatch(loadErrorMessage({
          allOrderError: 'OOps You Have Not Ordered A Meal'
        }));
      }
      dispatch(loadAllOrder(allOrder));
    });
};
export const updateOrder = (id, quantity, address, status) => (dispatch) => {
  fetch(`/api/v1/orders/${id}`, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id, status, address, quantity
    })
  })
    .then(res => res.json())
    .then((response) => {
      if (response.message) {
        return dispatch(loadErrorMessage({ updateError: response.message }));
      }
      dispatch(getMyOrder());
      dispatch(loadSuccessMessage({ updateSuccess: 'Order created' }));
      // return history.push('/dashboard');
    });
};

