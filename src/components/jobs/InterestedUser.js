import React from 'react';
// import Technologies from '../../../lib/Technologies';

const InterestedUser = ({ user, handleAccept, handleReject, Link }) => {
  return(
    <Link to={`/users/${user._id}`}>
      <div className="card">
        <div className="card-content">
          <div className="cta-caddy">
            <h2 className="title cta-partner-lrg">{user.jobTitle}</h2>
            <div className="cta">
              <button className="button" onClick={() => handleAccept(user)}>Accept</button>
              {' '}
              <button className="button" onClick={() => handleReject(user)}>Reject</button>
            </div>
          </div>
          <p>{user.yearsExp} year(s) experience</p>
          <p>{user.summary}</p>
          <p>Frontend skills:<br/> <strong>{user.technologies.frontend.map((skill, i) => <span key={i}>{skill} </span>)}</strong></p>
          <p>Backend skills:<br/> <strong>{user.technologies.backend.map((skill, i) => <span key={i}>{skill} </span>)}</strong></p>
        </div>
      </div>
    </Link>
  );
};

export default InterestedUser;
