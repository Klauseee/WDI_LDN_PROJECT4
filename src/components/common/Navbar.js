import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Navbar extends React.Component {
  state = {
    navIsOpen: false
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          Jibbly Jobbly
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
            <Link className="navbar-item" to="/employers">All Employers</Link>
            {/* IF A TOKEN IS PRESENT, SHOW THESE LINKS */}
            {
              // Auth.isAuthenticated() &&
              <a className="navbar-item" to="/" onClick={this.handleLogout}>Logout</a>}
            {/* IF A TOKEN IS NOT PRESENT, SHOW THESE LINKS */}
            {
              // !Auth.isAuthenticated() &&
              <div>
                <Link className="navbar-item" to="/users/login">User Login</Link>
                <Link className="navbar-item" to="/employers/login">Employer Login</Link>
              </div>}
            {
              // !Auth.isAuthenticated() &&
              <Link className="navbar-item" to="/register">Register</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
