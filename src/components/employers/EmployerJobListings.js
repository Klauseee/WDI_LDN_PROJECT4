import React from 'react';
import JobCard from '../common/JobCard';

const EmployerJobListings = ({ employer, Link, Auth }) => {
  return(
    <div>
      {Auth.getPayload().sub === employer._id &&
        <div>
          <h1 className="title">Welcome, {employer.name}</h1>
          <p className="subtitle">Looking for developers?</p>
          <hr/>
          <div className="cta-caddy">
            <p className="title cta-partner-lrg"><strong>Your live listings</strong> </p>
            <Link to={'/jobs/new'} className="button info cta">Add Job</Link>
          </div>
        </div>
      }
      {Auth.getPayload().role === 'users' &&
      <div>
        <h1 className="title">{employer.name}&apos;s live listings</h1>
        <hr/>
      </div>
      }

      <ul className="columns is-multiline">
        {employer.listings.map((job, i) =>
          <li key={i} className="column is-one-third-desktop is-half-tablet is-full-mobile animated">
            <JobCard
              job={job}
              Link={Link}
              ctaButtons="sml"
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default EmployerJobListings;
