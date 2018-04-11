import React from 'react';

const RegisterForm = ({ handleChange }) => {
  return(
    <div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          className="input"
          placeholder="Example@email.com"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          placeholder="********"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          className="input"
          placeholder="********"
          name="passwordConfirmation"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
