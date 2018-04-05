import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import EmployerIndex from './components/employers/IndexRoute';
import Login from './components/auth/Login';

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
              <Route path="/employers" component={EmployerIndex} />
              {/* <Route path="/register" component={Register} /> */}
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
