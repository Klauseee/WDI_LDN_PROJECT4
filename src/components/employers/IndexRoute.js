import React from 'react';
import axios from 'axios';
// import _ from 'lodash';

import { Link } from 'react-router-dom';

class IndexRoute extends React.Component {

  state = {
    employers: []
  }

  componentDidMount() {
    axios.get('/api/employers')
      .then(res => this.setState({ employers: res.data }));
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
        <ul className="columns is-multiline">
          {this.state.employers.map((employer, i) =>
            <li key={i} className="column is-one-third">
              <Link to={`/employers/${employer._id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={employer.logo} alt={`${employer.name} logo`} />
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

export default IndexRoute;
