import React from 'react';
// import { Route, IndexRoute } from 'react-router'

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Home from './components/home/index';

const Routes = () => (
  <Router history={history}>
    <div className="primary-layout">
      <main>
        <Switch>
          <Route exact path="/meals" component={Home} />
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
