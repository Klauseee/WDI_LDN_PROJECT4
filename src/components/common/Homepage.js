import React from 'react';
import Auth from '../../lib/Auth';

const Homepage = () => {
  return (
    <div className="container extra">
      {!Auth.isAuthenticated() &&
        <div>
          {/* JOBBLY LOGO GOES HERE */}
          <h1 className="title">A job board for developers</h1><br/>
          {/* <h2 className="subtitle">Jobbly is a free job board for developers. At Jobbly, we believe that your name, age or gender shouldn&apos;t be necessary upon initial application for jobs - so we don&apos;t ask you for it! </h2><br/> */}

          <h2 className="subtitle">Find sick coders &</h2><br/>
          <h2 className="subtitle">Send anonymous applications to employers who will consider you based on your coding prowess only!</h2><br/>

          <h2 className="subtitle">Join Jobbly here.</h2><br/>

        </div>
      }
      {Auth.isAuthenticated() && Auth.getPayload().role === 'employers' &&
      // IF USER IS EMPLOYER, ADD INSTRUCTIONS ON HOW TO ADD LISTINGS
        <div>
          <h1 className="title">Welcome Employer!</h1>
          <h2 className="subtitle">Head to your profile to start adding jobs!</h2><br/>
        </div>
      }

      {Auth.isAuthenticated() && Auth.getPayload().role === 'users' &&
      // IF USER IS SEEKER, ADD INSTRUCTIONS
        <div>
          <h1 className="title">Welcome Jobblians!</h1>
          <h2 className="subtitle">Head to Jobs to look at the live listings.</h2><br/>
          <h2 className="subtitle">Or update your profile using the profile link on the top right.</h2><br/>
        </div>
      }

    </div>
  );
};

export default Homepage;
