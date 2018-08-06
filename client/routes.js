import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import HomeComp from './components/home/index';
import RegisterComp from './components/register/index';
import ResetLinkComponent from './components/reset/resetLink';
import LoginComponent from './components/login/index';
import DashboardIndex from './components/dashboard/index';
import AdminComp from './components/admin/index';
import ResetPageComponent from './components/reset/resetPage';
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
          <Route exact path="/resetLink" component={ResetLinkComponent} />
          <Route exact path="/login" component={LoginComponent} />
          <Route path="/dashboard" component={DashboardIndex} />
          <Route path="/admin" component={AdminComp} />
          <Route path="/passwordreset/:token" component={ResetPageComponent} />
          <Redirect to="/dashboard" />
        </Switch>
      </main>
    </div>
  </Router>
);
export default Routes;
