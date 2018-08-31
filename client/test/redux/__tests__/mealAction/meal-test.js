import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../redux/Action/mealAction';
import * as types from '../../../../redux/Action/actionType';
import { mealActionMock } from '../../reduxMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async meal actions test', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should  dispatch LOAD_MOST_ORDERED meal action type ', () => {
    const { meal } = mealActionMock;
    fetchMock
      .getOnce('/api/v1/mostOrder/meals?limit=2', { body: meal });
    const expectedActions = [
      { type: types.LOAD_MOST_ORDERED, mostOrder: meal }
    ];
    const store = mockStore({ meal: [] });
    return store.dispatch(actions.loadMostOrderedMeal(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch LOAD_ALL_MEAL action type that get all meals ', () => {
    const limit = 1, offset = 1;
    const { meals } = mealActionMock;
    fetchMock
      .getOnce(`/api/v1/meals?limit=${limit}&offset=${offset}`, { body: meals });
    const expectedActions = [
      { type: types.LOAD_ALL_MEALS, meals }
    ];
    const store = mockStore({ meals: [] });
    return store.dispatch(actions.getAllMeals(limit, offset)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ALL_MEALS with getAllMeal action ', () => {
    const limit = 1, offset = 1;
    const message = mealActionMock.response.errorMessage;
    fetchMock
      .getOnce(`/api/v1/meals?limit=${limit}&offset=${offset}`, { body: message });
    const expectedActions = [
      { type: types.LOAD_ALL_MEALS, meals: { count: 0, rows: [] } }
    ];
    const store = mockStore({ meals: [] });
    return store.dispatch(actions.getAllMeals(limit, offset)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE with wrong meal data on createMeal action ', () => {
    const message = mealActionMock.response.errorMessage;
    fetchMock
      .post('/api/v1/meals', { body: message });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { createMealError: 'unauthorized' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.createMeal()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE with createMeal action ', () => {
    const limit = 6, offset = 0;
    const { meal } = mealActionMock;
    fetchMock
      .post('/api/v1/meals', { body: meal });
    fetchMock
      .get(`/api/v1/meals?limit=${limit}&offset=${offset}`, { body: meal });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { createMealSuccess: 'Meal Successfully Created' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.createMeal()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE with deleteMeal action ', () => {
    const response = mealActionMock.response.success;
    const id = 2;
    fetchMock
      .delete(`/api/v1/meals/${id}`, { body: response });
    fetchMock
      .get('/api/v1/meals?limit=6&offset=0', { body: response });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: response }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.deleteMeal(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_ERROR_MESSAGE with wrong meal data on updateMeal action ', () => {
    const response = mealActionMock.response.errorMessage;
    const id = 2;
    fetchMock
      .put(`/api/v1/meals/${id}`, { body: response });
    fetchMock
      .get('/api/v1/meals?limit=6&offset=0', { body: response });
    const expectedActions = [
      { type: types.LOAD_ERROR_MESSAGE, errorMessage: { updateMealError: 'unauthorized' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.updateMeal(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should  LOAD_SUCCESS_MESSAGE on updateMeal action ', () => {
    const response = mealActionMock.user;
    const id = 2;
    fetchMock
      .put(`/api/v1/meals/${id}`, { body: response });
    fetchMock
      .get('/api/v1/meals?limit=6&offset=0', { body: response });
    const expectedActions = [
      { type: types.LOAD_SUCCESS_MESSAGE, successMessage: { updateMealSuccess: 'Meal Successfully Updated' } }
    ];
    const store = mockStore({ creaMeal: [] });
    return store.dispatch(actions.updateMeal(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
