import React from 'react';
import axios from 'axios';
// import _ from 'lodash';
import Auth from '../../lib/Auth';

import moment from 'moment';

import { Link } from 'react-router-dom';

class IndexRoute extends React.Component {

  state = {
    jobs: [],
    currentUser: ''
  }

  componentDidMount() {
    axios.get('/api/jobs')
      .then(res => this.setState({ jobs: res.data, currentUser: Auth.getPayload().sub }, () => console.log(this.state)));
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
          {this.state.jobs.map((job, i) =>
            <li key={i} className="column is-full-width">
              <Link to={`/jobs/${job._id}`}>
                <div className="card">
                  {/* <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={job.logo} alt={`${job.name} logo`} />
                    </figure>
                  </div> */}
                  <div className="card-content">
                    <h3 className="title is-4">Job title: {job.title}</h3>
                    <h4 className="subtitle">Location: {job.location}</h4>
                    <h3 className="subtitle">Role type: {job.type}</h3>
                    <h3 className="subtitle">Created at: {moment(job.createdAt).format('DD-MMM-YY HH:mm:ss')}</h3>
                    {job.skills.primary.map((skill, i) => <p key={i}>{skill}, </p>)}
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
