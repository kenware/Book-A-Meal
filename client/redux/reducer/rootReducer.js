
import { combineReducers } from 'redux';
import mostOrder from './mealReducer';

const rootReducer = combineReducers({
  // short hand property names
  mostOrder,
});

export default rootReducer;
