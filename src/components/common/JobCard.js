import React from 'react';
import moment from 'moment';

const JobCard = ({ Link, job, ctaButtons }) => {
  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="card">
        <div className="card-content">
          <p className={`cta-partner-${ctaButtons}`}><strong>{job.title}</strong></p>
          <p>Location: <strong>{job.location}</strong></p>
          <p>Type: <strong><span className="capitalize">{job.type}</span></strong></p>
          <p>Skills required:<br/> <strong>{job.technologies.primary.map((skill, i) => <span key={i}>{skill} </span>)}</strong></p>
          <p>Would be nice:<br/> <strong>{job.technologies.secondary.map((skill, i) => <span key={i}>{skill} </span>)}</strong></p>
          <p>Salary: <strong>{`£${job.salary} `}{job.type === 'permanent' ? 'per annum' : 'per day'}</strong></p>
          <p className="low-opacity"><small>Created: {moment(job.createdAt).format('DD-MMM-YY HH:mm:ss')}</small></p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
