import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import Auth from '../../lib/Auth';

class Navbar extends React.Component {
  state = {
    navIsOpen: false
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  // handleLogout = () => {
  //   Auth.logout();
  //   this.props.history.push('/bangers');
  // }

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
            <Link className="navbar-item" to="/bangers">All Employers</Link>
            {/* IF A TOKEN IS PRESENT, SHOW THESE LINKS */}
            {
              // Auth.isAuthenticated() &&
              <a className="navbar-item" to="/login"
              // onClick={this.handleLogout}
              >Logout</a>}
            {/* IF A TOKEN IS NOT PRESENT, SHOW THESE LINKS */}
            {
              // !Auth.isAuthenticated() &&
              <Link className="navbar-item" to="/login">Login</Link>}
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
