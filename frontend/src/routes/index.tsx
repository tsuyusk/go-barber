import React from 'react';
import { Switch } from 'react-router-dom';

// Public routes
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

// Private routes
import Dashboard from '../pages/Dashboard';

//
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={SignIn} exact path="/" />
      <Route component={SignUp} path="/signup" />

      <Route component={Dashboard} path="/dashboard" isPrivate />
    </Switch>
  );
};

export default Routes;
