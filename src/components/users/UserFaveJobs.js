import React from 'react';


const UserMatchedJobs = ({ jobs }) => {
  console.log(jobs);
  return(
    <div>
      {jobs && <h2 className="subtitle">Your favorited jobs</h2> }
      {jobs && jobs.map(job =>
        <div key={job.title} className="card">
          <div className="card-content">
            <h2 className="title">{job.title}</h2>
            <h2 className="subtitle">{job.location}</h2>
            <p>{job.summary}</p>
            <h2 className="subtitle"><strong>Salary:</strong> £{job.salary}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMatchedJobs;
