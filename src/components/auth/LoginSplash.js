import React from 'react';
import { Link } from 'react-router-dom';

const LoginSplash = () => {
  return(
    // <div className="columns is-mobile container login-register">
    //   <div className="column is-full-desktop is-full-mobile columns is-multiline">
    //     <h2 className="title column is-full-desktop is-full-mobile">Are you a <br/><Link to="/users/register">User</Link> /<Link to="/employers/register"> Employer</Link>?</h2>
    //     <p>Already have an account?</p>
    //     <Link to="/users/login" className="button column is-full-desktop is-full-mobile">User Login</Link>
    //     <Link to="/employers/login" className="button column is-full-desktop is-full-mobile">Employer Login</Link>
    //   </div>
    // </div>
    <div className="container extra">
      <h1 className="title login-container">Sign up</h1>
      <hr/>
      <div className="login-container">
        <h2 className="subtitle"><strong>Are you a <br/><Link to="/users/register" className="bigger button success sign-up-btn">Seeker</Link><br/> or<br/> <Link to="/employers/register" className="bigger button success sign-up-btn">Employer</Link><br/>?</strong></h2>
        <hr/>
        <p className="">Already have an account? Login as <Link to="/users/login" className="">Seeker</Link> or <Link to="/employers/login" className="">Employer</Link></p>
      </div>
    </div>
  );
};

export default LoginSplash;
