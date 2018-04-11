import React from 'react';

const RegisterForm = ({ handleChange }) => {
  return(
    <div>
      <div className="field">
        {/* <label htmlFor="email">Email</label> */}
        <div className="control has-icons-left">
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <span className="icon is-small is-left"><i className="fas fa-unlock"></i></span>
        </div>
      </div>
      <div className="field">
        {/* <label htmlFor="passwordConfirmation">Confirm Password</label> */}
        <div className="control has-icons-left">
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            onChange={handleChange}
          />
          <span className="icon is-small is-left"><i className="fas fa-unlock"></i></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
