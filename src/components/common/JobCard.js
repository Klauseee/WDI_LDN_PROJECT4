import React from 'react';
import moment from 'moment';

const JobCard = ({ Link, job }) => {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="card">
        <div className="card-content">
          <h3 className="cta-partner-sml"><strong>{job.title}</strong></h3>
          <h3>Location: <strong>{job.location}</strong></h3>
          <h3>Type: <strong><span className="capitalize">{job.type}</span></strong></h3>
          <h3>Skills required:<br/> <strong>{job.technologies.primary.map((skill, i) => <span key={i}>{skill} </span>)}</strong></h3>
          <h3>Would be nice:<br/> <strong>{job.technologies.secondary.map((skill, i) => <span key={i}>{skill} </span>)}</strong></h3>
          <h3>Salary: <strong>{`£${job.salary} `}{job.type === 'permanent' ? 'per annum' : 'per day'}</strong></h3>
          <p className="low-opacity"><small>Created: {moment(job.createdAt).format('DD-MMM-YY HH:mm:ss')}</small></p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
