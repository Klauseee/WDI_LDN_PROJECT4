import React from 'react';
// import Technologies from '../../../lib/Technologies';

const InterestedUser = ({ user, handleAccept, handleReject, Link }) => {
  return(
    <Link to={`/users/${user._id}`}>
      <div className="card">
        <div className="card-content">
          <h2 className="title">{user.jobTitle}</h2>
          <div className="cta-caddy">
            <h2 className="subtitle cta-partner-lrg">{user.summary}</h2>
            <div className="cta">
              <button className="button" onClick={() => handleAccept(user)}>Accept</button>
              {' '}
              <button className="button" onClick={() => handleReject(user)}>Reject</button>
            </div>
          </div>
          <ul>
            {user.technologies.frontend.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default InterestedUser;
