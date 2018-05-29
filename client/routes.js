import React from 'react';
// import { Route, IndexRoute } from 'react-router'

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Home from './components/home/index';
import Register from './components/register/index';
import ResetLink from './components/reset/resetLink';
import Login from './components/login/index';
import Dashboard from './components/dashboard/index';
import Admin from './components/admin/index';
//import Edit from './components/admin/edit';

const Routes = () => (
  <Router history={history}>
    <div className="primary-layout">
      <main>
        <Switch>
          <Route exact path="/meals" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/resetLink" component={ResetLink} />
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/meals" />
        </Switch>
      </main>
    </div>
  </Router>
);
export default Routes;

/*
export default (
  <Route >
    <Route path="/recipes" component={Home} >
       <Route path="/recipes/:recipeId" component={Detail} />
    </Route>

  </Route>
);
*/
