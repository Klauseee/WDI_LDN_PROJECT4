import React from 'react';

const UserCard = ({ Link, user, ctaButtons }) => {
  return (

    <Link to={`/users/${user._id}`}>
      <div className="card">
        <div className="card-content">
          <h2 className={`cta-partner-${ctaButtons}`}><strong>{user.jobTitle}</strong></h2>
          <p>{user.yearsExp} year(s) experience</p>
          <p>{user.summary}</p>
          <p>Frontend skills:<br/> <strong>{user.technologies.frontend.map((skill, i) => <span key={i}>{skill} </span>)}</strong></p>
          <p>Backend skills:<br/> <strong>{user.technologies.backend.map((skill, i) => <span key={i}>{skill} </span>)}</strong></p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
