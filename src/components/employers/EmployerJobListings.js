import React from 'react';

const EmployerJobListings = ({ employer, moment, Link }) => {
  return(
    <div>
      <h1 className="title">Welcome, {employer.name}</h1>
      <h2 className="subtitle">Looking for developers?</h2>
      <div className="cta-caddy">
        <h2 className="subtitle cta-partner"><strong>Live listings:</strong> </h2>
        <Link to={'/jobs/new'} className="button cta">Add a Job</Link>
      </div>
      <ul className="columns is-multiline">
        {employer.listings.map((listing, i) =>
          <li key={i} className="column is-one-third-desktop is-half-tablet is-full-mobile animated">
            <Link to={`/jobs/${listing._id}`}>
              <div className="card">
                <div className="card-content">
                  <h3><strong>{listing.title}</strong></h3>
                  <h3>Created: {moment(listing.createdAt).format('DD-MMM-YY HH:mm:ss')}</h3>
                  <h3>Location: <strong>{listing.location}</strong></h3>
                  <h3>Type: <span className="capitalize"><strong>{listing.type}</strong></span></h3>
                  <h3>Primary skills required: <strong>{listing.technologies.primary.map((skill, i) => <span key={i}>{skill} </span>)}</strong></h3>
                </div>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EmployerJobListings;
