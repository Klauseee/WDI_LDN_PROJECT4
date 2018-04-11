import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import moment from 'moment';

import EmployerJobListings from './EmployerJobListings';

import { Link } from 'react-router-dom';

class EmployerShow extends React.Component {

  state = {
    employer: null,
    deletePressed: false
  };

  // GET THE EMPLOYER OBJECT
  componentDidMount() {
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
        // SHOW JOB LISTINGS IF THE EMPLOYER _ID IS THE SAME AS THE ID OF THE LOGGED IN EMPLOYER
        <div>
          {Auth.getPayload().sub === this.state.employer._id && (
            <div className="container">
              <EmployerJobListings employer={this.state.employer} moment={moment} Link={Link}/>
              <hr />
              <h1 className="title">Here&apos;s what other users can see</h1>
            </div>
          )}
          <div className="container">
            {Auth.getPayload().role === 'users' && <h1 className="title">Employer profile</h1>}
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
