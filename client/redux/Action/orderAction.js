
import * as types from './actionType';
import auth from '../../authenticate/auth';

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadErrorMessage = errorMessage => ({ type: types.LOAD_ERROR_MESSAGE, errorMessage });
export const loadSuccessMessage = successMessage => ({
  type: types.LOAD_SUCCESS_MESSAGE, successMessage
});
export const loadTodayMenu = menu => ({ type: types.LOAD_TODAY_MENU, menu });
export const loadMyOrder = myOrder => ({ type: types.LOAD_MY_ORDER, myOrder });
export const loadAllOrder = allOrder => ({ type: types.LOAD_ALL_ORDER, allOrder });

export const orderMeal = order => dispatch => window.fetch('/api/v1/orders', {
  method: 'POST',
  headers: {
    authorization: auth.getToken(),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(order)
})
  .then(res => res.json())
  .then((response) => {
    if (response.message) {
      return dispatch(loadErrorMessage({ orderError: response.message }));
    }
    return dispatch(loadSuccessMessage({ orderSuccess: 'Order created' }));
  });

export const getMyOrder = (limit, offset) => dispatch => window.fetch(`/api/v1/user/orders?limit=${limit}&offset=${offset}`, {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((myOrder) => {
    if (myOrder.message) {
      dispatch(loadMyOrder({ orders: [] }));
      return dispatch(loadErrorMessage({
        myOrderError: 'OOps You Have Not Ordered A Meal'
      }));
    }
    dispatch(loadMyOrder(myOrder));
  });

export const getAllOrders = (limit, offset) => dispatch => window.fetch(`/api/v1/orders?limit=${limit}&offset=${offset}`, {
  headers: {
    authorization: auth.getToken()
  }
})
  .then(res => res.json())
  .then((allOrder) => {
    if (allOrder.message) {
      return dispatch(loadErrorMessage({
        allOrderError: 'OOps Users Have Not Ordered A Meal'
      }));
    }
    dispatch(loadAllOrder(allOrder));
  });

export const updateOrder = (id, meals, address) => dispatch => window.fetch(`/api/v1/orders/${id}`, {
  method: 'PUT',
  headers: {
    authorization: auth.getToken(),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    address, meals
  })
})
  .then(res => res.json())
  .then((response) => {
    if (response.message) {
      return dispatch(loadErrorMessage({ updateError: response.message }));
    }
    dispatch(loadSuccessMessage({ updateSuccess: 'Order created' }));
    dispatch(getMyOrder());
  });

export const confirmStatus = id => dispatch => window.fetch(`/api/v1/orderStatus/${id}`, {
  method: 'PUT',
  headers: {
    authorization: auth.getToken(),
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then((response) => {
    if (response.message) {
      return dispatch(loadErrorMessage({ confirmError: response.message }));
    }
    dispatch(loadSuccessMessage({ confirmSuccess: 'Status confirmed' }));
    dispatch(getMyOrder());
  });
