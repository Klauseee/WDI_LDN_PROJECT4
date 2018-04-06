import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import Flash from '../../lib/Flash';

class UserRegister extends React.Component {

  state = {};

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      // .then(() => Flash.setMessage('success', 'Welcome to Jibbly Jobbly!'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="jobTitle">Job Title</label>
            <input className="input"
              placeholder="Job Title"
              name="jobTitle"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              type="password"
              className="input"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="summary">Summary</label>
            <textarea
              className="input"
              placeholder="Write a short summary about yourself"
              name="summary"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="yearsExp">Years of Experience</label>
            <input
              type="number"
              className="input"
              placeholder="Years of experience"
              name="yearsExp"
              onChange={this.handleChange}
            />
          </div>
          <button className="button is-primary">Submit</button>
        </form>

      </div>

    );
  }
}

export default UserRegister;
