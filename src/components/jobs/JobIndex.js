import React from 'react';
import axios from 'axios';
// import _ from 'lodash';
import Auth from '../../lib/Auth';

import moment from 'moment';

import { Link } from 'react-router-dom';

class JobIndex extends React.Component {

  state = {
    jobs: [],
    currentUser: {}
  }

  componentDidMount() {
    axios.get('/api/jobs')
      .then(res => this.setState({ jobs: res.data }, () => console.log(this.state)))
      .then(() => axios.get(`/api/users/${Auth.getPayload().sub}`))
      .then(res => this.setState({ currentUser: res.data }, () => console.log('state', this.state )));
  }

  handleFavorite = (jobId) => {
    console.log('jobId', jobId);
    // console.log(e.target);
    // add to the current logged in user's interested field
    if(!this.state.currentUser.favoriteJobs.includes(jobId)) {
      // add the job id if it doesnt exist
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.concat(jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
        // .then(() => Flash.setMessage('success', 'Job added to favorites'))
        // ADD THIS USER TO INTERESTED USERS IN THE JOB RECORD (DONE IN THE BACKEND)
          .then(() => this.props.history.push('/jobs'))
          .then(() => console.log(this.state));
      });
    } else {
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.filter(job => job !== jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
        // .then(() => Flash.setMessage('success', 'Job added to favorites'))
        // REMOVE THIS USER FROM INTERESTED USERS IN THE JOB RECORD (DONE IN THE BACKEND)
          .then(() => this.props.history.push('/jobs'))
          .then(() => console.log(this.state));
      });
    }
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
        <h1 className="title">Active jobs</h1>
        <h2 className="subtitle">Add a job to your favorites or click through to see more.</h2>
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
            <li key={i} className="column is-full">
              <Link to={`/jobs/${job._id}`}>
                <div className="card">
                  <div className="card-content">
                    <h3 className="subtitle"><strong>{job.title}</strong></h3>
                    <h3><strong>Location:</strong> {job.location}</h3>
                    <h3><strong>Type:</strong> {job.type}</h3>
                    <h3><strong>Created:</strong> {moment(job.createdAt).format('DD-MMM-YY HH:mm:ss')}</h3>
                    <h3><strong>Primary skills required:</strong> {job.technologies.primary.map((skill, i) => <span key={i}>{skill} </span>)}</h3>
                  </div>
                </div>
              </Link>
              {/* only show star to USERS */}
              {Auth.getPayload().role === 'users' && this.state.currentUser.favoriteJobs && this.state.currentUser.favoriteJobs.includes(job._id)
                ?
                <button className="button is-primary" onClick={() => this.handleFavorite(job._id)}><img  className="star" src="/assets/images/favorite.svg"/></button>
                :
                <button className="button is-primary" onClick={() => this.handleFavorite(job._id)}><img className="star" src="/assets/images/unfavorite.svg"/></button>
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default JobIndex;
