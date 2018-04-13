import React from 'react';
import axios from 'axios';
// import _ from 'lodash';
import Auth from '../../lib/Auth';

import { Link } from 'react-router-dom';

class EmployerIndex extends React.Component {

  state = {
    employers: []
  }

  // GET ALL EMPLOYERS
  componentDidMount() {
    axios.get('/api/employers')
      .then(res => this.setState({ employers: res.data, currentUser: Auth.getPayload().sub }));
  }

  render() {
    return (
      <div className="container extra">
        <h1 className="title">Registered employers</h1>
        <hr/>
        <ul className="columns is-mobile is-multiline">
          {this.state.employers.map((employer) =>
            <li key={employer.name} className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile animated">
              <Link to={`/employers/${employer._id}`}>
                <div className="card">
                  <div className="card-image card-img" style={{ backgroundImage: `url(${employer.logo})` }}>
                  </div>
                  <div className="card-content">
                    <h3 className="title is-4">{employer.name}</h3>
                    {/* <h4 className="subtitle">{employer.info}</h4> */}
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default EmployerIndex;
