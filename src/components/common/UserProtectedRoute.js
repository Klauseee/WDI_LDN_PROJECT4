import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

// destructuring, we want name specifically, whatever else is left we put into another object called rest
// component > we are taking the component part of the element and calling it Component. Need a component to start with a capital letter otherwise it will try to render it as a normal html element
const ProtectedRoute = ({ component: Component, ...rest }) => {
  !Auth.getPayload().role === 'users' && Flash.setMessage('danger', 'You must be logged in as a user.'); // if not authenticated then set flash message
  return (
    <Route {...rest} render={props =>
      Auth.getPayload().role === 'users' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
    />
  );
};

export default ProtectedRoute;
