import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import  'bootstrap/dist/js/bootstrap.min.js';
// import { Router, browserHistory } from 'react-router';
import Routes from './routes';
import configureStore from './redux/store';

// import {loadRecipes} from './redux/Action/action';
const store = configureStore();

render(
  <Provider store={store}>
    <Routes /* history={browserHistory}  routes={routes} */ />
  </Provider>
  , document.getElementById('root')
);
