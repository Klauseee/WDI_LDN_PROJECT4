import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import { Link } from 'react-router-dom';

// we need state so this will be a classical component
class ShowRoute extends React.Component {

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
      url: `/api/bangers/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => Flash.setMessage('success', 'Banger deleted'))
      .then(() => this.props.history.push('/bangers'));
  }

  render() {
    return (
      // to add a different screen whilst the employer is loading.. use a ternary operator
      this.state.employer ? (
        <div className="container">
          <h1 className="title">Welcome, {this.state.employer.name}</h1>
          <h2 className="subtitle">Looking for developers?</h2>
          <Link to={'/jobs/new'} className="button is-success">Add a Job</Link>
          <hr />
          <h1 className="title">Heres what other users can see</h1>
          <img src={this.state.employer.logo}/>
          <h2 className="subtitle"><strong>Name:</strong> {this.state.employer.name}</h2>
          <h2 className="subtitle"><strong>Location:</strong> {this.state.employer.location}</h2>
          <h2 className="subtitle"><strong>Info:</strong> {this.state.employer.info}</h2>
          <h2 className="subtitle"><strong>Perks:</strong> </h2>
          <ul>
            {this.state.employer.perks.map((perk, i) =>
              <li key={i} className="subtitle">{perk}</li>
            )}
          </ul>
          <ul>
            {this.state.employer.photos.map((photo, i) =>
              <li key={i} className="subtitle"><img src={photo} /></li>
            )}
          </ul>
          <ul>
            {this.state.employer.listings.map((listing) =>
              <Link key={listing._id} to={`/jobs/${listing._id}`} className="subtitle"><li>{listing.title}</li></Link>
            )}
          </ul>


          {!this.state.deletePressed ? (
            <div>
<<<<<<< HEAD
=======
              {Auth.getPayload().sub === this.state.employer._id && <Link to={'/jobs/new'} className="button is-success">New Job</Link>}
              {' '}
>>>>>>> development
              {Auth.getPayload().sub === this.state.employer._id && <Link to={`/employers/${this.state.employer._id}/edit`} className="button is-primary">Edit</Link>}
              {' '}
              {Auth.getPayload().sub === this.state.employer._id && <button onClick={this.handleToggle} className="button is-danger">Delete</button>}
            </div>
          ) : (
            <div>
              <button onClick={this.handleDelete} className="button is-primary">I&apos;m sure</button>
              {' '}
              <button onClick={this.handleToggle} className="button is-danger">Not yet</button>
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

export default ShowRoute;
