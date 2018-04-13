import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Technologies from '../../lib/Technologies';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import User from '../../lib/User';

// import InterestedUser from './InterestedUser';
import UserCard from '../common/UserCard';

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
      .then(() => this.setState({ currentUser: User.getUser() }, console.log(this.state.interestedUsers.length)));
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
      <div className="container extra">
        <h1 className="title">{this.state.title}</h1>
        <hr/>
        <div className="cta-caddy">
          {Auth.getPayload().role === 'users' && <h2 className="subtitle cta-partner"><strong>About the job</strong></h2>}
          {Auth.getPayload().sub === this.state.employer.id && <h2 className="subtitle cta-partner-lrg">This is your job listing, posted on {moment(this.state.createdAt).format('DD-MMM-YY HH:mm:ss')}</h2>}
          {/* EDIT & DELETE BUTTONS */}
          {!this.state.deletePressed ? (
            <div className="cta">
              {Auth.getPayload().sub === this.state.employer._id && <Link to={`/jobs/${this.state._id}/edit`} className="button info">Edit</Link>}
              {' '}
              {Auth.getPayload().sub === this.state.employer._id && <button className="button warning" onClick={this.handleToggle}>Delete</button>}
            </div>
          ) : (
            <div className="cta">
              {/* <p>Are you sure?</p> */}
              <button onClick={this.handleDelete} className="button warning">Confirm</button>
              {' '}
              <button onClick={this.handleToggle} className="button info">Cancel</button>
            </div>
          )}

          {/* FAVOURITE STUFF */}
          {Auth.getPayload().role === 'users' &&

          <div className="cta">
            {this.state.currentUser.favoriteJobs && this.state.currentUser.favoriteJobs.includes(this.state._id)
              ?
              <button className="button info" onClick={() => this.handleFavorite(this.state._id)}><img className="star" src="/assets/images/favorite.svg"/></button>
              :
              <button className="button info" onClick={() => this.handleFavorite(this.state._id)}><img className="star" src="/assets/images/unfavorite.svg"/></button>
            }
          </div>
          }
        </div>

        <div className="columns">
          <div className="column is-half-desktop is-half-tablet is-full-mobile">

            <p><strong>Employer:</strong> <Link to={`/employers/${this.state.employer.id}`}>{this.state.employer.name}</Link></p>
            <p><strong>Location:</strong> {this.state.location}</p>
            <p><strong>Type:</strong> <span className="capitalize">{this.state.type}</span></p>
            <p><strong>Salary:</strong> £{this.state.salary} {this.state.type === 'contract' ? 'per day' : 'per annum'} </p>

          </div>
          <div className="column is-half-desktop is-half-tablet is-full-mobile">

            <h2><strong>Primary requirements:</strong></h2>
            <ul className="columns is-centered is-multiline">
              {Technologies.frontend.map(technology =>
                this.state.technologies.primary.includes(technology.name) && <li className="icons-li" key={technology.name}><i className={`column ${technology.icon}`}></i>&nbsp; {technology.print}</li>
              )}
              {Technologies.backend.map(technology =>
                this.state.technologies.primary.includes(technology.name) && <li className="icons-li" key={technology.name}><i className={`column ${technology.icon}`}></i> &nbsp; {technology.print}</li>
              )}
            </ul>
            <h2><strong>Would be nice:</strong></h2>
            <ul className="columns is-centered is-multiline">
              {Technologies.frontend.map(technology =>
                this.state.technologies.secondary.includes(technology.name) && <li className="icons-li" key={technology.name}><i className={`column ${technology.icon}`}></i> &nbsp; {technology.print}</li>
              )}
              {Technologies.backend.map(technology =>
                this.state.technologies.secondary.includes(technology.name) && <li className="icons-li" key={technology.name}><i className={`column ${technology.icon}`}></i> &nbsp; {technology.print}</li>
              )}
            </ul>

          </div>
        </div>

        <p><strong>Summary:</strong> </p>
        <p>{this.state.summary}</p>

        {/* LIST OF INTERESTED USERS */}
        {Auth.getPayload().sub === this.state.employer._id && this.state.interestedUsers.length !== 0 &&
        <div>
          <hr />
          <h2 className="title">Interested Jobblians</h2>
          <div className="columns is-multiline">
            {this.state.interestedUsers && this.state.interestedUsers.map((user, i) =>
              <div key={i} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                <div className="cta-caddy">
                  <div className="cta-fave">
                    <button className="button success" onClick={() => this.handleAccept(user)}>Accept</button>
                    {' '}
                    <button className="button warning" onClick={() => this.handleReject(user)}>Reject</button>
                  </div>
                  <UserCard
                    Link={Link}
                    user={user}
                    ctaButtons="lrg"
                  />
                </div>
              </div>
            )}
          </div>

        </div>
        }
      </div>
    );
  }
}

export default JobShow;
