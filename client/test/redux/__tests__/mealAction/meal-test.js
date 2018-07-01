import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/mealAction';
import * as types from '../../../../redux/Action/actionType';

// import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// let auth = { getToken: jest.fn() };
describe('async actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should  LOAD_MOST_ORDERED meal ', () => {
    const meal = [{ name: 'rice' }];
    fetchMock
      .getOnce('/api/v1/mostOrder/meals/6', { body: meal });

    const expectedActions = [
      { type: types.LOAD_MOST_ORDERED, mostOrder: meal }
    ];
    const store = mockStore({ meal: [] });
    return store.dispatch(actions.loadMostOrderedMeal()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ALL_MEAL ', () => {
    const meals = [{ name: 'rice' }];
    fetchMock
      .getOnce('/api/v1/meals', { body: meals });

    const expectedActions = [
      { type: types.LOAD_ALL_MEALS, meals }
    ];
    const store = mockStore({ meals: [] });
    return store.dispatch(actions.getAllMeals()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE with unauthenticated user with getAllMeal action ', () => {
    const message = { message: 'unauthorized' };
    fetchMock
      .getOnce('/api/v1/meals', { body: message });

    const expectedActions = [
      { type: types.LOAD_ALL_MEALS, meals: [] }
    ];
    const store = mockStore({ meals: [] });
    return store.dispatch(actions.getAllMeals()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE with wrong meal data on createMeal action ', () => {
    const message = { message: 'unauthorized' };
    fetchMock
      .post('/api/v1/meals', { body: message });

    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { createMealError: 'unauthorized' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.createMeal()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE with createMeal action ', () => {
    const meal = { name: 'rice' };
    const meals = { name: 'rice' };
    fetchMock
      .post('/api/v1/meals', { body: meal });
    fetchMock
      .get('/api/v1/meals', { body: meals });

    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { createMealSuccess: 'Meal Successfully Created' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.createMeal()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE with deleteMeal action ', () => {
    const meal = { message: 'success' };
    const id = 2;
    fetchMock
      .delete(`/api/v1/meals/${id}`, { body: meal });
    fetchMock
      .get('/api/v1/meals', { body: meal });

    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: meal }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.deleteMeal(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should  LOAD_ERROR_MESSAGE with wrong meal data on updateMeal action ', () => {
    const response = { message: 'unauthorized' };
    const id = 2;
    fetchMock
      .put(`/api/v1/meals/${id}`, { body: response });

    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { updateMealError: 'unauthorized' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.updateMeal(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should  LOAD_SUCCESS_MESSAGE on updateMeal action ', () => {
    const response = { name: 'rice' };
    const id = 2;
    fetchMock
      .put(`/api/v1/meals/${id}`, { body: response });
    fetchMock
      .get('/api/v1/meals', { body: response });

    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { updateMealSuccess: 'Meal Successfully Updated' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.updateMeal(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
