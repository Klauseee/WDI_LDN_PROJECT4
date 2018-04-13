import React from 'react';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="container extra">
      {!Auth.isAuthenticated() &&
        <div>
          {/* JOBBLY LOGO GOES HERE */}
          <h1 className="title"><img src="/assets/images/jbly-final.svg" className="hero"/>A job board for developers</h1><br/>

          <h2 className="subtitle">Whether you&apos;re an employer on the hunt for cool developers or you&apos;re a developer looking for new opportunities, Jbly has got you covered.</h2>
          {/* <p>Here at Jbly, we believe skills come first. That&apos;s why all our users are anonymous, so you&apos;ll be judged only on talent, experience and ability.</p> */}

          <div className="cta-caddy">
            <Link className="cta" to="/loginregister"><h2 className="bigger button success sign-up-btn"><strong>Join Jbly here.</strong></h2></Link>
          </div>


        </div>
      }
      {Auth.isAuthenticated() && Auth.getPayload().role === 'employers' &&
      // IF USER IS EMPLOYER, ADD INSTRUCTIONS ON HOW TO ADD LISTINGS
        <div>
          <h1 className="title"><img src="/assets/images/jbly-final.svg" className="hero"/>Welcome Employer!</h1><br/>
          <h2 className="subtitle">Head to your <Link to={`/${Auth.getPayload().role}/${Auth.getPayload().sub}`}>profile</Link> to add and edit jobs.</h2><br/>
        </div>
      }

      {Auth.isAuthenticated() && Auth.getPayload().role === 'users' &&
      // IF USER IS SEEKER, ADD INSTRUCTIONS
        <div>
          <h1 className="title"><img src="/assets/images/jbly-final.svg" className="hero"/>Welcome Joblians!</h1><br/>
          <h2 className="subtitle">Update your <Link to={`/${Auth.getPayload().role}/${Auth.getPayload().sub}`}>profile</Link>.</h2><br/>
          <h2 className="subtitle">Head to <Link to="/jobs">jobs</Link> to look at the live listings or <Link to="/employers">employers</Link> to see which companies have joined us!</h2><br/>
        </div>
      }

    </div>
  );
};

export default Homepage;
