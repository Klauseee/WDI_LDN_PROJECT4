import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import User from '../../lib/User';


class Login extends React.Component {

  state = {};


  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api${this.props.location.pathname}`, this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        User.setUser(res.data.user);
        // console.log(Auth.getPayload().sub);
        console.log(res.data);
      })
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
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
          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default Login;
