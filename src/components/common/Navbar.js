import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
// import axios from 'axios';

class Navbar extends React.Component {
  state = {
    navIsOpen: false,
    currentUser: ''
  }

  componentWillMount() {
    this.setState({ currentUser: Auth.getPayload().role }, () => console.log(this.state.currentUser));
  }


  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
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
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/employers" onClick={Auth.logout}>Logout</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/users/login">User Login</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/employers/login">Employer Login</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/users/register">User Register</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/employers/register">Employer Register</Link>}


          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
