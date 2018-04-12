import React from 'react';
import Auth from '../../lib/Auth';

const Homepage = () => {
  return (
    <div className="container extra">
      {!Auth.isAuthenticated() &&
        <div>
          {/* JOBBLY LOGO GOES HERE */}
          <h1 className="title"><img src="/assets/images/jbly-final.svg" className="hero"/>a job board for developers</h1><br/>

          <h2 className="subtitle">Whether you&apos;re an employer on the hunt for cool developers or you&apos;re a developer looking for new opportunities, Jbly has got you covered.</h2>
          {/* <p>Here at Jbly, we believe skills come first. That&apos;s why all our users are anonymous, so you&apos;ll be judged only on talent, experience and ability.</p> */}

          <h2 className="subtitle padding-top">Join Jbly here. ADD LINK TO REGISTER!!!!</h2><br/>

        </div>
      }
      {Auth.isAuthenticated() && Auth.getPayload().role === 'employers' &&
      // IF USER IS EMPLOYER, ADD INSTRUCTIONS ON HOW TO ADD LISTINGS
        <div>
          <h1 className="title">Welcome Employer!</h1>
          <h2 className="subtitle">Head to your profile to start adding jobs.</h2><br/>
        </div>
      }

      {Auth.isAuthenticated() && Auth.getPayload().role === 'users' &&
      // IF USER IS SEEKER, ADD INSTRUCTIONS
        <div>
          <h1 className="title">Welcome Jobblians!</h1>
          <h2 className="subtitle">Update your profile using the profile link on the top right.</h2><br/>
          <h2 className="subtitle">Head to Jobs to look at the live listings.</h2><br/>
        </div>
      }

    </div>
  );
};

export default Homepage;
