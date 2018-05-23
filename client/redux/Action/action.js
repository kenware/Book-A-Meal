
import * as types from './actionType';
// import token from '../../midleware/auth'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import history from '../../history';

export const loadMostOrdered = mostOrder => ({ type: types.LOAD_MOST_ORDERED, mostOrder });
export const loadMostOrderedMeal = () => (dispatch) => {
  fetch('/api/v1/mostOrder/meals/6')
    .then(res => res.json())
    .then(mostOrder =>
      dispatch(loadMostOrdered(mostOrder)));
};
