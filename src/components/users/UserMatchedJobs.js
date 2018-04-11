import React from 'react';


const UserMatchedJobs = ({ jobs, handleApply, handleDismiss }) => {
  console.log(jobs);
  return(
    <div>
      <h2 className="subtitle">Your matched jobs</h2>
      {jobs && jobs.map(job =>
        <div key={job.title} className="card">
          <div className="card-content">
            <h2 className="title">{job.title}</h2>
            <h2 className="subtitle">{job.location}</h2>
            <p>{job.summary}</p>
            <h2 className="subtitle"><strong>Salary:</strong> £{job.salary}</h2>
            <button className="button is-primary" onClick={() => handleApply(job)}>Apply</button>
            <button className="button is-danger" onClick={() => handleDismiss(job)}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMatchedJobs;
