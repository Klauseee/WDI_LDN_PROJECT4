import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Login extends React.Component {

  state = {};


  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.post(`/api${this.props.location.pathname}`, this.state)
      .then(res => (Auth.setToken(res.data.token)))
      .then(() => this.props.history.push('/bangers'));
  }

  render() {
    console.log('rendering');
    return (
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
    );
  }
}

export default Login;
