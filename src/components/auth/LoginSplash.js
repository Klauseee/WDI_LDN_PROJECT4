import React from 'react';
import { Link } from 'react-router-dom';

const LoginSplash = () => {
  return(
    <div className="columns is-mobile container">
      <div className="column is-full-desktop is-full-mobile columns is-multiline">
        <h2 className="title column is-full-desktop is-full-mobile">Are you a <br/><Link to="/users/register">User</Link> /<Link to="/employers/register"> Employer</Link>?</h2>
        <p>Already have an account?</p>
        <Link to="/users/login" className="button column is-full-desktop is-full-mobile">User Login</Link>
        <Link to="/employers/login" className="button column is-full-desktop is-full-mobile">Employer Login</Link>
      </div>
    </div>
  );
};

export default LoginSplash;
