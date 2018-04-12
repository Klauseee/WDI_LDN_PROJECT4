import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Hammer from 'react-hammerjs';

import Auth from '../../lib/Auth';
import User from '../../lib/User';
// import Technologies from '../../lib/Technologies';

import SearchFilter from './SearchFilter';

import moment from 'moment';

import { Link } from 'react-router-dom';

class JobIndex extends React.Component {

  state = {
    jobs: [],
    currentUser: {},
    searchTech: []
  }

  // GET ALL JOBS AND CURRENT USER
  componentDidMount() {
    axios.get('/api/jobs')
      .then(res => this.setState({ jobs: res.data, currentUser: User.getUser() }, () => {
        const newJobs = this.state.jobs.slice();
        newJobs.forEach((job, i) => {
          if(this.state.currentUser.matchedJobs.includes(job._id)) newJobs.splice(i, 1);
        });
        newJobs.forEach((job, i) => {
          if(this.state.currentUser.rejectedJobs.includes(job._id)) newJobs.splice(i, 1);
        });
        newJobs.forEach((job, i) => {
          if(this.state.currentUser.appliedJobs.includes(job._id)) newJobs.splice(i, 1);
        });
        this.setState({ jobs: newJobs }, () => console.log(this.state));
      }));
  }

  handleFavorite = (jobId) => {
    // add to the current logged in user's interested field
    if(!this.state.currentUser.favoriteJobs.includes(jobId)) {
      // add the job id if it doesnt exist
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.concat(jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
          .then(res => User.setUser(res.data));
      });
    } else {
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.filter(job => job !== jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
          .then(res => User.setUser(res.data));
      });
    }
  }

  // HAMMER GESTURE FUNCTIONS =====================================================
  handleSwipeLeft = (e) => {
    e.target.classList.add('slideOutLeft');
    setTimeout(() => this.swipeRemove(e.target), 700);
  }

  handleSwipeRight = (e) => {
    this.handleFavorite(e.target.getAttribute('data-id'));
    e.target.classList.add('slideOutRight');
    setTimeout(() => this.swipeRemove(e.target), 700);
    // console.log(e.target);
  }

  // findListItem = (element, class) => {
  //   if(element.classList.contains(class)) return element;
  //   else(while((element = element.parentNode) && !element.classlist.contains(class)));
  //   return element;
  // }

  swipeRemove = (target) => {
    target.parentNode.removeChild(target);
  }
  // ==============================================================================

  // FILTER FUNCTIONS =============================================================
  handleSearchInput = (e, searchAttribute) => {
    console.log(`${searchAttribute}: ${e.target.value}`);
    this.setState({ [searchAttribute]: e.target.value });
  }

  handleCheck = ({ target: { name, checked }}) => {
    let newTechnologies;
    if(checked) {
      newTechnologies = this.state.searchTech.concat(name);
    } else {
      newTechnologies = this.state.searchTech.slice();
      const index = newTechnologies.indexOf(name);
      newTechnologies.splice(index, 1);
    }
    this.setState({ searchTech: newTechnologies });
  }

  filterJobs = () => {
    // convert search queries to regex
    const employerNameRegex = new RegExp(this.state.searchEmployerName, 'i');
    const titleRegex = new RegExp(this.state.searchTitle, 'i');
    const locationRegex = new RegExp(this.state.searchLocation, 'i');
    const typeRegex = new RegExp(this.state.searchType, 'i');
    // filtering
    let filtered = [];
    if (this.state.searchType) {
      filtered = _.filter(this.state.jobs, (job) => typeRegex.test(job.type));
    } else {
      filtered = this.state.jobs;
    }
    filtered = _.filter(filtered, (job) => employerNameRegex.test(job.employer.name));
    filtered = _.filter(filtered, (job) => titleRegex.test(job.title));
    filtered = _.filter(filtered, (job) => locationRegex.test(job.location));
    if (this.state.searchMinSalary) {
      filtered = _.filter(filtered, (job) => job.salary > this.state.searchMinSalary);
    }
    if (this.state.searchMaxSalary) {
      filtered = _.filter(filtered, (job) => job.salary < this.state.searchMaxSalary);
    }
    filtered = _.filter(filtered, (job) => {
      const allSkills = job.technologies.primary.concat(job.technologies.secondary);
      return _.intersection(allSkills, this.state.searchTech).length === this.state.searchTech.length;
    });
    filtered = this.state.orderBy === 'asc' ? _.orderBy(filtered, ['salary'], ['asc']) : _.orderBy(filtered, ['salary'], ['desc']);
    return filtered;
  }
  // ==============================================================================

  render() {
    return (
      <div className="container extra">
        <h1 className="title">Active jobs</h1>
        <h2 className="subtitle">Add a job to your favorites or click through to see more. Swipe right to add to favourites, or swipe left to dismiss.</h2>
        <hr />
        {/* SEARCH FILTER */}
        <SearchFilter handleSearchInput={this.handleSearchInput} handleCheck={this.handleCheck} />

        <hr />
        <ul className="columns is-mobile is-multiline">
          {this.filterJobs().map((job) =>
            <Hammer
              key={job.title}
              onSwipeLeft={this.handleSwipeLeft}
              onSwipeRight={this.handleSwipeRight}
              className="column is-one-third-desktop is-half-tablet is-full-mobile animated">
              <li data-id={job._id}>
                <div className="cta-caddy">
                  {/* only show star to USERS */}
                  {Auth.getPayload().role === 'users' && this.state.currentUser.favoriteJobs && this.state.currentUser.favoriteJobs.includes(job._id)
                    ?
                    <div className="cta-fave">
                      <button className="button is-info" onClick={() => this.handleFavorite(job._id)}><img className="star" src="/assets/images/favorite.svg"/></button>
                    </div>
                    :
                    <div className="cta-fave">
                      <button className="button is-info" onClick={() => this.handleFavorite(job._id)}><img className="star" src="/assets/images/unfavorite.svg"/></button>
                    </div>
                  }
                  <Link to={`/jobs/${job._id}`}>
                    <div className="card">
                      <div className="card-content">
                        <h3 className="cta-partner-sml"><strong>{job.title}</strong></h3>

                        <h3><strong>Location:</strong> {job.location}</h3>
                        <h3><strong>Type:</strong> <span className="capitalize">{job.type}</span></h3>
                        <h3><strong>Primary skills needed:</strong> {job.technologies.primary.map((skill, i) => <span key={i}>{skill} </span>)}</h3>
                        <h3><strong>Would be nice:</strong> {job.technologies.secondary.map((skill, i) => <span key={i}>{skill} </span>)}</h3>
                        <h3><strong>Salary:</strong> {`£${job.salary} `}{job.type === 'permanent' ? 'per annum' : 'per day'}</h3>
                        <p className="low-opacity"><small>Created: {moment(job.createdAt).format('DD-MMM-YY HH:mm:ss')}</small></p>
                      </div>
                    </div>
                  </Link>
                </div>

              </li>
            </Hammer>
          )}
        </ul>
      </div>
    );
  }
}

export default JobIndex;
