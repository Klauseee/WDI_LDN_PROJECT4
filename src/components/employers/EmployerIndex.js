import React from 'react';
import axios from 'axios';
// import _ from 'lodash';
import Auth from '../../lib/Auth';
import Hammer from 'react-hammerjs';

import { Link } from 'react-router-dom';

class IndexRoute extends React.Component {

  state = {
    employers: []
  }

  componentDidMount() {
    axios.get('/api/employers')
      .then(res => this.setState({ employers: res.data, currentUser: Auth.getPayload().sub }));
  }

  handleSwipeLeft = (e) => {
    e.target.classList.add('slideOutLeft');
    setTimeout(() => this.swipeRemove(e.target), 700);
  }

  handleSwipeRight = (e) => {
    e.target.classList.add('slideOutRight');
    setTimeout(() => this.swipeRemove(e.target), 700);

  }

  swipeRemove = (target) => {
    target.parentNode.removeChild(target);
    console.log('swipe occurred');
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
        <ul className="columns is-mobile is-multiline">
          {this.state.employers.map((employer) =>
            <Hammer
              onSwipeLeft={this.handleSwipeLeft}
              onSwipeRight={this.handleSwipeRight}
              key={employer.name}
              className="column is-one-third-desktop is-full-mobile animated">
              <li>
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
            </Hammer>
          )}
        </ul>
      </div>
    );
  }
}

export default IndexRoute;
