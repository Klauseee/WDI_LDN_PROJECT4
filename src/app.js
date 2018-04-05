import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import EmployerIndex from './components/employers/IndexRoute';
import Login from './components/auth/Login';
import UserRegister from './components/auth/UserRegister';
// import EmployerRegister from './components/auth/EmployerRegister';

import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          {/* <FlashMessages /> */}
          <section className="section">
            <Switch>
              {/* <Route path="/employers/:id/edit" component={EditRoute} /> */}
              {/* <Route path="/employers/new" component={NewRoute} /> */}
              {/* <Route path="/employers/:id" component={ShowRoute} /> */}
              <Route path="/users/login" component={Login} />
              <Route path="/employers/login" component={Login} />
              <Route path="/users/register" component={UserRegister} />
              {/* <Route path="/employers/register" component={EmployerRegister} /> */}
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
