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

  // handleChange = (e) => {
  //   console.log(e.target.value);
  //   this.setState({ search: e.target.value });
  // }

  // filterBangers = () => {
  //   // make a REGEX (case insensitive)
  //   const regex = new RegExp(this.state.search, 'i');
  //   // use _.filter to filter the bangers, second argument takes a function, array or object.
  //   const filtered = _.filter(this.state.bangers, (banger) => regex.test(banger.name));
  //   return filtered;
  // }

  render() {
    return (
      <div className="container">
        {/* search filter */}
        {/* <form>
          <div className="field">
            <input
              className="input"
              type="text"
              name="search"
              placeholder="Search.."
              onChange={this.handleChange}
            />
          </div>
        </form> */}
        <h1 className="title">Registered employers</h1>
        <ul className="columns is-mobile is-multiline">
          {this.state.employers.map((employer) =>
            <li key={employer.name} className="column is-one-third-desktop is-full-mobile animated">
              <Link to={`/employers/${employer._id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img draggable="false" src={employer.logo} alt={`${employer.name} logo`} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <h3 className="title is-4">{employer.name}</h3>
                    <h4 className="subtitle">{employer.info}</h4>
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
