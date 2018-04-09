import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Auth from '../../lib/Auth';
import Hammer from 'react-hammerjs';

import moment from 'moment';

import { Link } from 'react-router-dom';

class JobIndex extends React.Component {

  state = {
    jobs: [],
    currentUser: {},
    minSalary: 0,
    maxSalary: 100000000000000000
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
          .then(() => this.props.history.push('/jobs'))
          .then(() => console.log(this.state));
      });
    } else {
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.filter(job => job !== jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
          .then(() => this.props.history.push('/jobs'))
          .then(() => console.log(this.state));
      });
    }
  }

  handleSwipeLeft = (e) => {
    this.handleFavorite(e.target.getAttribute('data-id'));
    e.target.classList.add('slideOutLeft');
    setTimeout(() => this.swipeRemove(e.target), 700);
  }

  handleSwipeRight = (e) => {
    this.handleFavorite(e.target.getAttribute('data-id'));
    e.target.classList.add('slideOutRight');
    setTimeout(() => this.swipeRemove(e.target), 700);
  }

  swipeRemove = (target) => {
    target.parentNode.removeChild(target);
    console.log('swipe occurred');
  }

  handleLocation = (e) => {
    this.setState({ searchLocation: e.target.value });
  }

  handleMinSalary = (e) => {
    this.setState({ minSalary: e.target.value }, () => console.log(this.state));
  }

  handleMaxSalary = (e) => {
    this.setState({ maxSalary: e.target.value }, () => console.log(this.state));
  }

  handleSort = (e) => {
    e.target.value === 'lth' ? _.orderBy(this.state.jobs, ['salary'], ['asc']) : _.orderBy(this.state.jobs, ['salary'], ['desc']);
    this.setState({ salarySort: e.target.value }, () => console.log(this.state));
  }

  filterJobs = () => {
    // make a REGEX (case insensitive)
    const regex = new RegExp(this.state.searchLocation, 'i');
    // use _.filter to filter the bangers, second argument takes a function, array or object.
    let filtered = _.filter(this.state.jobs, (job) => regex.test(job.location));
    filtered = _.orderBy(filtered, ['salary'], [this.state.salarySort]);
    filtered = _.filter(filtered, (job) => job.salary > this.state.minSalary && job.salary < this.state.maxSalary);
    return filtered;
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Active jobs</h1>
        <h2 className="subtitle">Add a job to your favorites or click through to see more.</h2>
        {/* search filter */}
        <form>
          <div className="field">
            <input
              className="input"
              type="text"
              name="search"
              placeholder="Search by location.."
              onChange={this.handleLocation}
            />
          </div>
          <select onChange={this.handleSort}>
            <option value="asc">Salary: low to high</option>
            <option value="desc">Salary: high to low</option>
          </select>
          <div className="field">
            <input
              className="input"
              type="number"
              name="search"
              placeholder="Minimum salary"
              onChange={this.handleMinSalary}
            />
          </div>
          <div className="field">
            <input
              className="input"
              type="number"
              name="search"
              placeholder="Minimum salary"
              onChange={this.handleMaxSalary}
            />
          </div>
        </form>
        <ul className="columns is-mobile is-multiline">
          {this.filterJobs().map((job) =>
            <Hammer
              key={job.title}
              onSwipeLeft={this.handleSwipeLeft}
              onSwipeRight={this.handleSwipeRight}
              className="column is-one-third-desktop is-full-mobile animated">
              <li data-id={job._id}>
                <Link to={`/jobs/${job._id}`}>
                  <div className="card">
                    <div className="card-content">
                      <h3><strong>{job.title}</strong></h3>
                      <h3><strong>Location:</strong> {job.location}</h3>
                      <h3><strong>Type:</strong> {job.type}</h3>
                      <h3><strong>Created:</strong> {moment(job.createdAt).format('DD-MMM-YY HH:mm:ss')}</h3>
                      <h3><strong>Primary skills required:</strong> </h3>
                      <ul>
                        {job.technologies.primary.map((skill, i) => <li key={i}>{skill} </li>)}
                      </ul>
                    </div>
                  </div>
                </Link>
                {/* only show star to USERS */}
                {Auth.getPayload().role === 'users' && this.state.currentUser.favoriteJobs && this.state.currentUser.favoriteJobs.includes(job._id)
                  ?
                  <button className="button is-primary" onClick={() => this.handleFavorite(job._id)}><img  className="star" src="../../assets/images/favorite.svg"/></button>
                  :
                  <button className="button is-primary" onClick={() => this.handleFavorite(job._id)}><img className="star" src="../../assets/images/unfavorite.svg"/></button>
                }
              </li>
            </Hammer>
          )}
        </ul>
      </div>
    );
  }
}

export default JobIndex;
