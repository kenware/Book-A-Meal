import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import HomeComp from './components/home/index';
import RegisterComp from './components/register/index';
import ResetLink from './components/reset/resetLink';
import LoginComp from './components/login/index';
import Dashboard from './components/dashboard/index';
import AdminComp from './components/admin/index';
import ResetPage from './components/reset/resetPage';
/**
 * React route using react v4
 */
const Routes = () => (
  <Router history={history}>
    <div className="primary-layout">
      <main>
        <Switch>
          <Route exact path="/meals" component={HomeComp} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/resetLink" component={ResetLink} />
          <Route exact path="/login" component={LoginComp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminComp} />
          <Route path="/passwordreset/:token" component={ResetPage} />
          <Redirect to="/meals" />
        </Switch>
      </main>
    </div>
  </Router>
);
export default Routes;
