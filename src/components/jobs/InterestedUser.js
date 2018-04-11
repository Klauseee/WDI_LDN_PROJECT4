import React from 'react';
// import Technologies from '../../../lib/Technologies';

const InterestedUser = ({ user, handleAccept, handleReject }) => {
  return(
    <div className="card">
      <div className="card-content">
        <h2 className="title">{user.jobTitle}</h2>
        <h2 className="subtitle">{user.summary}</h2>
        <ul>
          {user.technologies.frontend.map((skill, i) => <li key={i}>{skill}</li>)}
        </ul>
        <button className="button is-primary" onClick={() => handleAccept(user)}>Yes</button>
        <button className="button is-danger" onClick={() => handleReject(user)}>No</button>
      </div>
    </div>
  );
};

export default InterestedUser;
