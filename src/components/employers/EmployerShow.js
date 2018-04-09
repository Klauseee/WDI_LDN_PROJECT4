import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import moment from 'moment';

import { Link } from 'react-router-dom';

// we need state so this will be a classical component
class EmployerShow extends React.Component {

  state = {
    employer: null,
    deletePressed: false
  };

  componentDidMount() {
    // react router has given us props in the background.
    // console.log(this.props); // everything here has been created by the router
    // console.log(this.props.match.params.id); // contains the :id parameter!
    axios.get(`/api/employers/${this.props.match.params.id}`)
      .then(res => this.setState({ employer: res.data }, () => console.log(this.state)));
  }

  handleToggle = () => {
    this.setState({ deletePressed: !this.state.deletePressed });
  }

  handleDelete = () => {
    axios({
      method: 'DELETE',
      url: `/api/employers/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => Flash.setMessage('success', 'Employer account deleted'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      // to add a different screen whilst the employer is loading.. use a ternary operator
      this.state.employer ? (
        <div className="container">
          <h1 className="title">Welcome, {this.state.employer.name}</h1>
          <h2 className="subtitle">Looking for developers?</h2>
          <Link to={'/jobs/new'} className="button is-success">Add a Job</Link>
          <h2 className="subtitle"><strong>Live Listings:</strong> </h2>
          <ul>
            {this.state.employer.listings.map((listing, i) =>
              <li key={i} className="column is-full">
                <Link to={`/jobs/${listing._id}`}>
                  <div className="card">
                    <div className="card-content">
                      <h3 className="title is-4">Job title: {listing.title}</h3>
                      <h4 className="subtitle">Location: {listing.location}</h4>
                      <h3 className="subtitle">Role type: {listing.type}</h3>
                      <h3 className="subtitle">Created at: {moment(listing.createdAt).format('DD-MMM-YY HH:mm:ss')}</h3>
                      {listing.technologies.primary.map((skill, i) => <p key={i}>{skill}, </p>)}
                    </div>
                  </div>
                </Link>
                {/* only show star to USERS */}
                {Auth.getPayload().role === 'user' && this.state.currentUser.favoriteJobs && this.state.currentUser.favoriteJobs.includes(listing._id)
                  ?
                  <button className="button is-primary" onClick={() => this.handleFavorite(listing._id)}><img  className="star" src="../../assets/images/favorite.svg"/></button>
                  :
                  <button className="button is-primary" onClick={() => this.handleFavorite(listing._id)}><img className="star" src="../../assets/images/unfavorite.svg"/></button>
                }
              </li>
            )}
          </ul>

          <hr />
          <h1 className="title">Heres what other users can see</h1>
          <img src={this.state.employer.logo}/>
          <h2 className="subtitle"><strong>Company:</strong> {this.state.employer.name}</h2>
          <h2 className="subtitle"><strong>Location:</strong> {this.state.employer.location}</h2>
          <h2 className="subtitle"><strong>Info:</strong> {this.state.employer.info}</h2>
          <h2 className="subtitle"><strong>Perks:</strong> </h2>
          <ul>
            {this.state.employer.perks.map((perk, i) =>
              <li key={i} className="subtitle">{perk}</li>
            )}
          </ul>
          <h2 className="subtitle"><strong>Photos:</strong> </h2>
          <ul>
            {this.state.employer.photos.map((photo, i) =>
              <li key={i} className="subtitle"><img src={photo} /></li>
            )}
          </ul>

          {!this.state.deletePressed ? (
            <div>
              {Auth.getPayload().sub === this.state.employer._id && <Link to={`/employers/${this.state.employer._id}/edit`} className="button is-primary">Edit</Link>}
              {' '}
              {Auth.getPayload().sub === this.state.employer._id && <button onClick={this.handleToggle} className="button is-danger">Delete</button>}
            </div>
          ) : (
            <div>
              <p>Are you sure?</p>
              <button onClick={this.handleDelete} className="button is-primary">Delete</button>
              {' '}
              <button onClick={this.handleToggle} className="button is-danger">Cancel</button>
            </div>
          )}

        </div>
      ) : (
        <div className="container">
          <h1 className="title">LOADING</h1>
        </div>
      )
    );
  }
}

export default EmployerShow;
