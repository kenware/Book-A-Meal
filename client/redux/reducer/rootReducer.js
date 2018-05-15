
import { combineReducers } from 'redux';
import meals from './mealReducer';

const rootReducer = combineReducers({
  // short hand property names
  meals,
});

export default rootReducer;
