import React from 'react';
import JobCard from '../common/JobCard';

const EmployerJobListings = ({ employer, Link, Auth }) => {
  return(
    <div>
      {Auth.getPayload().sub === employer._id &&
        <div>
          <h1 className="title">Welcome, {employer.name}</h1>
          <h2 className="subtitle">Looking for developers?</h2>
          <div className="cta-caddy">
            <h2 className="subtitle cta-partner-lrg"><strong>Live listings:</strong> </h2>
            <Link to={'/jobs/new'} className="button cta">Add a Job</Link>
          </div>
        </div>
      }
      {Auth.getPayload().role === 'users' && <h1 className="title">Here are {employer.name}&apos;s live listings</h1>}
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
