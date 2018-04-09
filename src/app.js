import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';

import EmployerIndex from './components/employers/EmployerIndex';
import EmployerShow from './components/employers/EmployerShow';
import EmployerEdit from './components/employers/EmployerEdit';

import JobNew from './components/jobs/JobNew';
import JobShow from './components/jobs/JobShow';
import JobIndex from './components/jobs/JobIndex';
import JobEdit from './components/jobs/JobEdit';

import UserShow from './components/users/UserShow';
import UserEdit from './components/users/UserEdit';

import Login from './components/auth/Login';
import UserRegister from './components/auth/UserRegister';
import EmployerRegister from './components/auth/EmployerRegister';

import UserProtectedRoute from './components/common/UserProtectedRoute';
import EmployerProtectedRoute from './components/common/EmployerProtectedRoute';

import 'bulma';
import './assets/scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <section className="section">
            <Switch>
              <UserProtectedRoute path="/users/:id/edit" component={UserEdit} />
              <EmployerProtectedRoute path="/employers/:id/edit" component={EmployerEdit} />
              <EmployerProtectedRoute path="/jobs/:id/edit" component={JobEdit}/>
              <EmployerProtectedRoute path="/jobs/new" component={JobNew} />
              <Route path="/employers/register" component={EmployerRegister} />
              <Route path="/users/register" component={UserRegister} />
              <Route path="/users/login" component={Login} />
              <Route path="/employers/login" component={Login} />
              <Route path="/employers/:id" component={EmployerShow} />
              <Route path="/jobs/:id" component={JobShow} />
              <Route path="/users/:id" component={UserShow} />
              <UserProtectedRoute path="/jobs" component={JobIndex}/>
              <Route path="/employers" component={EmployerIndex} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
