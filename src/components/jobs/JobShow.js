import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import User from '../../lib/User';

import InterestedUser from './InterestedUser';

import { Link } from 'react-router-dom';

class JobShow extends React.Component {
  state = {
    // keep this hidden, grab the employers ID from somewhere else.
    employer: {
      _id: '',
      name: ''
    },
    title: '',
    location: '',
    // permanent or contract
    type: '',
    technologies: {
      primary: [],
      secondary: []
    },
    summary: '',
    salary: 0,
    // show this only to the employer who made the job.
    interestedUsers: [],
    matchedUsers: [],
    deletePressed: false,
    currentUser: {}
  }

  // GET JOB OBJECT AND THE CURRENT USER (for favorites logic)
  componentDidMount() {
    // console.log('did mount');
    axios.get(`/api/jobs/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .then(() => console.log(this.state))
      .then(() => this.setState({ currentUser: User.getUser() }));
  }

  handleFavorite = (jobId) => {
    // add to the current logged in user's interested field
    if(!this.state.currentUser.favoriteJobs.includes(jobId)) {
      // add the job id if it doesnt exist
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.concat(jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
        // .then(() => Flash.setMessage('success', 'Job added to favorites'))
          .then(() => this.props.history.push(`/jobs/${this.state._id}`))
          .then(() => console.log(this.state));
      });
    } else {
      this.setState({ currentUser: { favoriteJobs: this.state.currentUser.favoriteJobs.filter(job => job !== jobId) }}, () => {
        axios.put(`/api/users/${Auth.getPayload().sub}`, this.state.currentUser)
        // .then(() => Flash.setMessage('success', 'Job added to favorites'))
          .then(() => this.props.history.push(`/jobs/${this.state._id}`))
          .then(() => console.log(this.state));
      });
    }
  }

  handleAccept = (user) => {
    // find the user within the interestedusers array on the job
    const userIndex = this.state.interestedUsers.indexOf(user);
    // find the job within the favoriteJobs array of the interested user
    const jobIndex = this.state.interestedUsers[userIndex].favoriteJobs.indexOf(this.state._id);
    //clone favoritejobs array
    const newFavoriteJobs = this.state.interestedUsers[userIndex].favoriteJobs.slice();
    newFavoriteJobs.splice(jobIndex, 1);
    const newInterestedUsers = this.state.interestedUsers.slice();
    newInterestedUsers.splice(userIndex, 1);
    const newMatchedJobs = user.matchedJobs.slice();
    newMatchedJobs.push(this.state._id);
    console.log(newMatchedJobs);
    axios.put(`/api/users/${user._id}`, { matchedJobs: newMatchedJobs, favoriteJobs: newFavoriteJobs })
      .then(res => console.log(res.data));
    this.setState({ interestedUsers: newInterestedUsers });
  }

  handleReject = (user) => {
    // find the user within the interestedusers array on the job
    const userIndex = this.state.interestedUsers.indexOf(user);
    // find the job within the favoriteJobs array of the interested user
    const jobIndex = this.state.interestedUsers[userIndex].favoriteJobs.indexOf(this.state._id);
    //clone favoritejobs array
    const newFavoriteJobs = this.state.interestedUsers[userIndex].favoriteJobs.slice();
    newFavoriteJobs.splice(jobIndex, 1);
    const newInterestedUsers = this.state.interestedUsers.slice();
    newInterestedUsers.splice(userIndex, 1);
    const newRejectedJobs = this.state.interestedUsers[userIndex].rejectedJobs.slice();
    newRejectedJobs.push(this.state._id);
    axios.put(`/api/users/${user._id}`, { favoriteJobs: newFavoriteJobs, rejectedJobs: newRejectedJobs })
      .then(res => console.log(res.data));
    this.setState({ interestedUsers: newInterestedUsers });
  }

  handleDelete = () => {
    axios({
      method: 'DELETE',
      url: `/api/jobs/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => Flash.setMessage('success', 'Job listing deleted'))
      .then(() => this.props.history.push('/'));
  }

  handleToggle = () => {
    this.setState({ deletePressed: !this.state.deletePressed });
  }

  render() {
    // console.log('employer', this.state.employer);
    if(!this.state) return null;
    return(
      <div className="container">
        <h1 className="title">{this.state.title}</h1>
        <h2 className="subtitle"><Link to={`/employers/${this.state.employer.id}`}>Click here to see more about  {this.state.employer.name}</Link></h2>
        <h2 className="subtitle"><strong>Location:</strong> {this.state.location}</h2>
        <h2 className="subtitle"><strong>Employment type:</strong> {this.state.type}</h2>
        <h2 className="subtitle"><strong>Job summary</strong></h2>
        <p> {this.state.summary}</p>
        <h2 className="subtitle"><strong>Primary requirements</strong></h2>
        <ul className="columns">
          {Technologies.frontend.map(technology =>
            this.state.technologies.primary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
          {Technologies.backend.map(technology =>
            this.state.technologies.primary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
        </ul>
        <h2 className="subtitle"><strong>Secondary requirements</strong></h2>
        <ul className="columns">
          {Technologies.frontend.map(technology =>
            this.state.technologies.secondary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
          {Technologies.backend.map(technology =>
            this.state.technologies.secondary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
        </ul>
        <h2 className="subtitle"><strong>Salary:</strong> £{this.state.salary}</h2>

        {/* FAVOURITE STUFF */}
        {Auth.getPayload().role === 'users' && this.state.currentUser.favoriteJobs && this.state.currentUser.favoriteJobs.includes(this.state._id)
          ?
          <button className="button is-primary" onClick={() => this.handleFavorite(this.state._id)}><img className="star" src="/assets/images/favorite.svg"/></button>
          :
          <button className="button is-primary" onClick={() => this.handleFavorite(this.state._id)}><img className="star" src="/assets/images/unfavorite.svg"/></button>
        }

        {/* EDIT & DELETE BUTTONS */}
        {!this.state.deletePressed ? (
          <div>
            {Auth.getPayload().sub === this.state.employer._id && <Link to={`/jobs/${this.state._id}/edit`} className="button is-primary">Edit</Link>}
            {Auth.getPayload().sub === this.state.employer._id && <button className="button is-danger" onClick={this.handleToggle}>Delete</button>}
          </div>
        ) : (
          <div>
            <p>Are you sure?</p>
            <button onClick={this.handleDelete} className="button is-danger">Delete</button>
            {' '}
            <button onClick={this.handleToggle} className="button">Cancel</button>
          </div>
        )}

        {/* LIST OF INTERESTED USERS */}
        {Auth.getPayload().role === 'employers' &&
        <div>
          {this.state.interestedUsers.map((user) =>
            <InterestedUser
              key={user._id}
              user={user}
              handleAccept={this.handleAccept}
              handleReject={this.handleReject}
            />
          )}
        </div>}
      </div>
    );
  }
}

export default JobShow;
