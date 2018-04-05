import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';

import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          {/* <FlashMessages /> */}
          <section className="section">
            <h1>Jibbly Jobbly</h1>
            <Switch>
              {/* <Route path="/employers/:id/edit" component={EditRoute} />
              <Route path="/employers/new" component={NewRoute} />
              <Route path="/employers/:id" component={ShowRoute} />
              <Route path="/employers" component={IndexRoute} /> */}
              {/* <Route path="/register" component={Register} /> */}
              {/* <Route path="/login" component={Login} /> */}
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
