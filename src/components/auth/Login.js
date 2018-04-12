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
        res.data.user ? User.setUser(res.data.user) : User.setUser(res.data.employer);
      })
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="container extra">
        <h1 className="title">Log in</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="field">
            {/* <label htmlFor="email">Email</label> */}
            <div className="control has-icons-left">
              <input
                className="input"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
            </div>
          </div>

          <div className="field">
            {/* <label htmlFor="password">Password</label> */}
            <div className="control has-icons-left">
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left"><i className="fas fa-unlock"></i></span>
            </div>
          </div>
          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default Login;
