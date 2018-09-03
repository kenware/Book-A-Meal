import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/orderAction';
import * as types from '../../../../redux/Action/actionType';

// import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// let auth = { getToken: jest.fn() };
describe('async order actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with orderMeal Action ', () => {
    const message = { message: 'order failed' };
    fetchMock
      .post('/api/v1/orders', { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { orderError: 'order failed' } }
    ];
    const store = mockStore({ order: [] });
    store.dispatch(actions.orderMeal()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE when order is created with orderMeal Action', () => {
    const order = { status: 'pending', meal: { name: 'rice' } };
    fetchMock
      .post('/api/v1/orders', { body: order });

    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { orderSuccess: 'Order created' } }
    ];
    const store = mockStore({ order: [] });
    store.dispatch(actions.orderMeal()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with getMyOrder Action ', () => {
    const message = { message: 'order failed' };
    fetchMock
      .get('/api/v1/user/orders?limit=2&offset=2', { body: message });
    const expectedActions = [
      { type: types.LOAD_MY_ORDER, myOrder: { orders: [] } },
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { myOrderError: 'OOps You Have Not Ordered A Meal' } }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getMyOrder(2, 2)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with getMyOrder Action ', () => {
    const myOrder = { status: 'pending', meal: { name: 'rice' } };
    fetchMock
      .get('/api/v1/user/orders?limit=2&offset=2', { body: myOrder });
    const expectedActions = [
      { type: types.LOAD_MY_ORDER, myOrder }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getMyOrder(2, 2)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail with getAllOrder Action ', () => {
    const message = { message: 'order failed' };
    fetchMock
      .get('/api/v1/orders?limit=2&offset=2', { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { allOrderError: 'OOps Users Have Not Ordered A Meal' } },
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getAllOrders(2, 2)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ALL_ORDER when order is created with getAllOrder Action ', () => {
    const allOrder = { status: 'pending', meal: { name: 'rice' } };
    fetchMock
      .get('/api/v1/orders?limit=2&offset=2', { body: allOrder });
    const expectedActions = [
      { type: types.LOAD_ALL_ORDER, allOrder }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.getAllOrders(2, 2)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when order fail update with updateOrder Action ', () => {
    const response = { message: 'update failed' };
    const id = 2;
    fetchMock
      .put(`/api/v1/orders/${id}`, { body: response });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { updateError: response.message } },
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.updateOrder(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE when order is updated with updateOrder Action ', () => {
    const allOrder = { status: 'pending', meal: { name: 'rice' } };
    const id = 2;
    fetchMock
      .put(`/api/v1/orders/${id}`, { body: allOrder });
    fetchMock
      .get('/api/v1/user/orders', { body: allOrder });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { updateSuccess: 'Order created' } }
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.updateOrder(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE when confirm status fail with confirmStatus Action ', () => {
    const response = { message: 'confirm status failed' };
    const id = 2;
    fetchMock
      .put(`/api/v1/orderStatus/${id}`, { body: response });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { confirmError: response.message } },
    ];
    const store = mockStore({ myOrder: [] });
    store.dispatch(actions.confirmStatus(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE when order is updated with updateOrder Action ', () => {
    const status = { status: 'confirmed', meal: { name: 'rice' } };
    const id = 2;
    fetchMock
      .put(`/api/v1/orders/${id}`, { body: status });
    fetchMock
      .get('/api/v1/user/orders', { body: status });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { confirmSuccess: 'Status confirmed' } }
    ];
    const store = mockStore({ myOrder: [], getMyOrder: jest.fn() });
    store.dispatch(actions.updateOrder(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
