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
        <div>
          {/* VIEW FOR SHOW PAGE OWNER */}
          {Auth.getPayload().sub === this.state.employer._id && (
            <div className="container extra">
              <EmployerJobListings employer={this.state.employer} moment={moment} Link={Link}/>
              <hr />
              <div className="cta-caddy">
                <h1 className="title cta-partner-lrg">Here&apos;s what other users can see</h1>
                {!this.state.deletePressed ? (
                  <div className="cta">
                    {Auth.getPayload().sub === this.state.employer._id && <Link to={`/employers/${this.state.employer._id}/edit`} className="button">Edit</Link>}
                    {' '}
                    {Auth.getPayload().sub === this.state.employer._id && <button onClick={this.handleToggle} className="button">Delete</button>}
                  </div>
                ) : (
                  <div className="cta">
                    {/* <p>Are you sure?</p> */}
                    <button onClick={this.handleDelete} className="button">Confirm</button>
                    {' '}
                    <button onClick={this.handleToggle} className="button">Cancel</button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* VIEW FOR USERS */}
          <div className="container extra">
            {Auth.getPayload().role === 'users' && <h1 className="title">Employer profile</h1>}
            <div className="columns">
              <div className='column'>
                <img className="max-width" src={this.state.employer.logo}/>
                {/* <h2 className="subtitle"><strong>Company:</strong> {this.state.employer.name}</h2> */}
                <h2 className="subtitle">Location: <strong>{this.state.employer.location}</strong></h2>
                <h2 className="subtitle">Info: <strong>{this.state.employer.info}</strong></h2>
                <h2 className="subtitle">Perks:
                <ul>
                  {this.state.employer.perks.map((perk, i) =>
                    <li key={i}>{perk}</li>
                  )}
                </ul>
                </h2>
              </div>
              <div className="column">
                {/* <h2 className="subtitle"><strong>Photos:</strong> </h2> */}
                <ul>
                  {this.state.employer.photos.map((photo, i) =>
                    <li key={i} className="subtitle"><img src={photo} /></li>
                  )}
                </ul>

              </div>
            </div>
          </div>
        </div>
      ) : (
        // LOADING VIEW
        <div className="container extra">
          <h1 className="title">LOADING</h1>
        </div>
      )
    );
  }
}

export default EmployerShow;
