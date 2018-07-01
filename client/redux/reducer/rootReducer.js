
import { combineReducers } from 'redux';
import mostOrder from './mostOrderReducer';
import errorMessage from './errorReducer';
import successMessage from './successReducer';
import meals from './mealsReducer';
import menu from './menuReducer';
import myOrder from './myOrderReducer';
import allOrder from './allOrderReducer';
import notifics from './notificsReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  // short hand property names
  mostOrder,
  errorMessage,
  successMessage,
  meals,
  menu,
  myOrder,
  allOrder,
  notifics,
  user
});
export default rootReducer;
