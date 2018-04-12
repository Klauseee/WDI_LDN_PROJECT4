import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Navbar extends React.Component {
  state = {
    userType: '',
    navIsOpen: false,
    loginRequest: false,
    registerRequest: false
  }

  componentWillReceiveProps() {
    if(Auth.isAuthenticated()) this.setState({ userType: Auth.getPayload().role }, () => console.log('current user type', this.state.userType));
  }

  componentDidMount() {
    if(Auth.isAuthenticated()) this.setState({ userType: Auth.getPayload().role }, () => console.log('current user type', this.state.userType));
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLoginRequest = () => {
    if(this.state.registerRequest) this.setState({ registerRequest: !this.state.registerRequest });
    this.setState({ loginRequest: !this.state.loginRequest });
  }

  handleRegisterRequest = () => {
    if(this.state.loginRequest) this.setState({ loginRequest: !this.state.loginRequest });
    this.setState({ registerRequest: !this.state.registerRequest });
  }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }


  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          Jobbly
          </Link>
          <div
            onClick={this.handleToggle}
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {(Auth.isAuthenticated() || Auth.getPayload().role === 'users') && <Link
              className="navbar-item"
              to="/employers">
              All Employers
            </Link>}
            {Auth.getPayload().role === 'users' && <Link
              className="navbar-item"
              to="/jobs">
              Jobs
            </Link>}

            {Auth.isAuthenticated() &&
              <Link
                className="navbar-item"
                to={`/${this.state.userType}/${Auth.getPayload().sub}`}>
                Profile
              </Link>
            }

            {Auth.isAuthenticated() && <Link className="navbar-item" to="/" onClick={Auth.logout}>Logout</Link>}

            {(this.state.loginRequest && !Auth.isAuthenticated()) && <div>
              <Link
                className="navbar-item"
                to="/users/login"
                onClick={this.handleLoginRequest}>
                User Login
              </Link>
              <Link
                className="navbar-item"
                to="/employers/login"
                onClick={this.handleLoginRequest}>
                Employer Login
              </Link>
              <a className="navbar-item" onClick={this.handleLoginRequest}>Cancel</a>
            </div>}
            {(!this.state.loginRequest && !Auth.isAuthenticated()) && <a className="navbar-item" onClick={this.handleLoginRequest}>Login</a>}

            {(this.state.registerRequest && !Auth.isAuthenticated()) && <div>
              <Link
                className="navbar-item"
                to="/users/register"
                onClick={this.handleRegisterRequest}>
                User Register
              </Link>
              <Link
                className="navbar-item"
                to="/employers/register"
                onClick={this.handleRegisterRequest}>
                Employer Register
              </Link>
              <a className="navbar-item" onClick={this.handleRegisterRequest}>Cancel</a>
            </div>}

            {(!this.state.registerRequest && !Auth.isAuthenticated()) && <a className="navbar-item" onClick={this.handleRegisterRequest}>Register</a>}

          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
