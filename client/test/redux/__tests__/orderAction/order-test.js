import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/orderAction';
import * as types from '../../../../redux/Action/actionType';
import { orderActionMock } from '../../reduxMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async order actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with orderMeal Action ', () => {
    const { message } = orderActionMock;
    fetchMock
      .post('/api/v1/orders', { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { orderError: 'order failed' } }
    ];
    const store = mockStore({ order: [] });
    store.dispatch(actions.orderMeal()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE when order is created with orderMeal Action', () => {
    const order = orderActionMock.orderData;
    fetchMock
      .post('/api/v1/orders', { body: order });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { orderSuccess: 'Order created' } }
    ];
    const store = mockStore({ order: [] });
    store.dispatch(actions.orderMeal()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with getMyOrder Action ', () => {
    const { message } = orderActionMock;
    fetchMock
      .get('/api/v1/user/orders?limit=3&offset=2', { body: message });
    const expectedActions = [
      { type: types.LOAD_MY_ORDER, myOrder: { orders: [] } },
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { myOrderError: 'OOps You Have Not Ordered A Meal' } }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getMyOrder(3, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  dispatch LOAD_MY_ORDER action type that get user orders', () => {
    const myOrder = orderActionMock.orderResponse;
    fetchMock
      .get('/api/v1/user/orders?limit=2&offset=2', { body: myOrder });
    const expectedActions = [
      { type: types.LOAD_MY_ORDER, myOrder }
    ];
    const store = mockStore({ myOrder: [] });
    return store.dispatch(actions.getMyOrder(2, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with getAllOrder Action ', () => {
    const { message } = orderActionMock;
    fetchMock
      .get('/api/v1/orders?limit=2&offset=2', { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { allOrderError: 'OOps Users Have Not Ordered A Meal' } },
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getAllOrders(2, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ALL_ORDER when order is created with getAllOrder Action ', () => {
    const allOrder = orderActionMock.orderResponse;
    fetchMock
      .get('/api/v1/orders?limit=2&offset=2', { body: allOrder });
    const expectedActions = [
      { type: types.LOAD_ALL_ORDER, allOrder }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getAllOrders(2, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail update with updateOrder Action ', () => {
    const response = orderActionMock.updateError;
    const id = 2;
    fetchMock
      .put(`/api/v1/orders/${id}`, { body: response });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { updateError: response.message } },
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.updateOrder(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE when order is updated with updateOrder Action ', () => {
    const updatedOrder = orderActionMock.orderResponse;
    const id = 2;
    fetchMock
      .put(`/api/v1/orders/${id}`, { body: updatedOrder });
    fetchMock
      .get('/api/v1/user/orders?limit=5&offset=0', { body: updatedOrder });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { updateSuccess: 'Order created' } }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.updateOrder(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when confirm status fail with confirmStatus Action ', () => {
    const response = orderActionMock.confirmStatusError;
    const id = 2;
    fetchMock
      .put(`/api/v1/orderStatus/${id}`, { body: response });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { confirmError: response.message } },
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.confirmStatus(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE when order is updated with updateOrder Action ', () => {
    const status = orderActionMock.confirmStatusSuccess;
    const id = 2;
    fetchMock
      .put(`/api/v1/orders/${id}`, { body: status })
      .get('/api/v1/user/orders?limit=5&offset=0', {});

    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { confirmSuccess: 'Status confirmed' } }
    ];
    const store = mockStore({ myOrder: [], getMyOrder: jest.fn() });
    store.dispatch(actions.updateOrder(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
