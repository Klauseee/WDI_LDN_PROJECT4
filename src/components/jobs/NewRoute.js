import React from 'react';
import axios from 'axios';
// import Form from './Form';
import Auth from '../../lib/Auth';

class NewRoute extends React.Component {

  state = {
    // keep this hidden, grab the employers ID from somewhere else.
    employer: '',
    title: '',
    location: '',
    // permanent or contract
    type: '',
    skills: {
      primary: [],
      secondary: []
    },
    summary: '',
    // show this only to the employer who made the job.
    interestedUsers: [],
    salary: 0
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/jobs', this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/jobs'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleChange = ({ target: { name, value }}) => {
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ [name]: value, errors });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {/* THIS WILL BE INITIAL REGISTER */}
          <div className="field">
            <label htmlFor="employer">Employer</label>
            <input
              className="input"
              placeholder="Employer ID"
              name="employer"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              placeholder="********"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              className="input"
              placeholder="********"
              name="passwordConfirmation"
              onChange={this.handleChange}
            />
          </div>

          {/* REST OF THE HENCH FORM */}
          <div className="field">
            <label htmlFor="name">Company Name</label>
            <input
              className="input"
              placeholder="My company"
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="logo">Company Logo</label>
            <input
              className="input"
              placeholder="In the form of a link.. REMEMBER TO ADD FILESTACK OPTION"
              name="logo"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="location">Company Location</label>
            <input
              className="input"
              placeholder="Where are you situated?"
              name="location"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="info">Company Info</label>
            <input
              className="input"
              placeholder="Write a little blurb about your company"
              name="info"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="photos">Company Photos</label>
            <Repeater />
          </div>
          <div className="field">
            <label htmlFor="photos">Company Perks</label>
            <Repeater />
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default NewRoute;
