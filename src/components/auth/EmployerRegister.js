import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import Flash from '../../lib/Flash';

import Repeater from '../common/Repeater.js';

class EmployerRegister extends React.Component {

  state = {}

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/employers/register', this.state)
    // send the form data
    // set token inside local storage
      // .then(res => localStorage.setItem('token', res.data.token)) // replace using helper methods created in lib/Auth
      .then(res => Auth.setToken(res.data.token))
      // .then(() => Flash.setMessage('success', 'Thanks for registering!'))
      .then(() => this.props.history.push('/bangers'));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        {/* THIS WILL BE INITIAL REGISTER */}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="example@email.com"
            name="email"
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

        {/* photos: [{ type: String }],
        perks: [{ type: String }],

        listings: [{ type: mongoose.Schema.ObjectId, ref: 'Job'}],
        type: { type: String, default: 'employer' } */}

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default EmployerRegister;
