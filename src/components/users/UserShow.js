import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import Technologies from '../../lib/Technologies';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import JobCard from '../common/JobCard';

import { Link } from 'react-router-dom';

class UserShow extends React.Component {

  state = {
    user: {},
    technologies: {
      frontend: [],
      backend: []
    },
    mailOptions: {},
    deletePressed: false
  }

  //
  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => {
        const frontendTechs = [];
        const backendTechs = [];
        Technologies.frontend.map(technology => {
          if(this.state.user.technologies.frontend.includes(technology.name)) frontendTechs.push(technology);
        });
        Technologies.backend.map(technology => {
          if(this.state.user.technologies.backend.includes(technology.name)) backendTechs.push(technology);
        });
        this.setState({ technologies: { frontend: frontendTechs, backend: backendTechs }}, () => console.log(this.state.user));
      });
  }

  handleApply = (job) => {
    axios.post(`/api/jobs/${job._id}/apply`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ user: { ...this.state.user, matchedJobs: res.data.matchedJobs } }, () => console.log(this.state.user));
      });
  }

  handleDismiss = (jobId) => {
    const newMatchedJobs = _.filter(this.state.user.matchedJobs, (job) => job._id !== jobId.id);
    this.setState({ user: { matchedJobs: newMatchedJobs}}, () => axios.put(`/api/users/${this.props.match.params.id}`, { matchedJobs: this.state.user.matchedJobs})
      .then(res => console.log(res.data)));
  }

  handleToggle = () => {
    this.setState({ deletePressed: !this.state.deletePressed });
  }

  handleDelete = () => {
    axios({
      method: 'DELETE',
      url: `/api/users/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => Flash.setMessage('success', 'Employer account deleted'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return(
      <div className="container extra">
        <div className="cta-caddy">
          {Auth.getPayload().sub === this.state.user._id &&
            <div>
              <h1 className="title cta-partner-lrg">Your user profile</h1>
              <hr/>
            </div>
          }
          {/* EDIT/ DELETE BUTTONS */}
          {!this.state.deletePressed ? (
            <div className="cta">
              {Auth.getPayload().sub === this.state.user._id && <Link to={`/users/${this.state.user._id}/edit`} className="button info">Edit</Link>}
              {' '}
              {Auth.getPayload().sub === this.state.user._id && <button onClick={this.handleToggle} className="button warning">Delete</button>}
            </div>
          ) : (
            <div className="cta">
              {/* <p>Are you sure?</p> */}
              <button onClick={this.handleDelete} className="button warning">Confirm</button>
              {' '}
              <button onClick={this.handleToggle} className="button info">Cancel</button>
            </div>
          )}
        </div>

        <div className="columns">
          <div className="column is-half-desktop is-half-tablet is-full-mobile">
            <h1 className="title">{this.state.user.jobTitle}</h1>
            <p>{this.state.user.yearsExp} years(s) experience</p>
            {/* <h2 className="subtitle">Summary</h2> */}
            <p><strong>Summary:</strong> {this.state.user.summary}</p>
            {this.state.user.cv && <p><strong><a target="_blank" href={this.state.user.cv}>View your CV</a></strong></p>}
            {!this.state.user.cv && <p><strong>You have not yet uploaded a CV!<br/> Click the edit button on the top right to do that & apply for your matched jobs.</strong></p>}

          </div>
          <div className="column is-half-desktop is-half-tablet is-full-mobile">

            <h2><strong>Frontend skills:</strong></h2>
            <ul className="columns is-centered is-multiline">
              {this.state.technologies.frontend.map((technology, i) =>
                <li key={i}><i className={`column ${technology.icon}`}></i>&nbsp; {technology.print}</li>
              )}
            </ul>
            <h2><strong>Backend skills:</strong></h2>
            <ul className="columns is-centered is-multiline">
              {this.state.technologies.backend.map((technology, i) =>
                <li key={i}><i className={`column ${technology.icon}`}></i>&nbsp; {technology.print}</li>
              )}
            </ul>

          </div>
        </div>

        {Auth.getPayload().sub === this.state.user._id &&
          <div>
            <hr />

            <h2 className="subtitle"><strong>Your favorited jobs</strong></h2>
            <div className="columns is-multiline">
              {this.state.user.favoriteJobs && this.state.user.favoriteJobs.map((job, i) =>
                <div key={i} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                  <JobCard
                    job={job}
                    Link={Link}
                    ctaButtons="sml"
                  />
                </div>
              )}
            </div>

            <hr />

            <h2 className="subtitle"><strong>Your matched jobs</strong></h2>
            <div className="columns is-multiline">
              {this.state.user.matchedJobs && this.state.user.matchedJobs.map((job, i) =>
                <div key={i} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                  <div className="cta-caddy">
                    <div className="cta-fave">
                      <button className="button success" onClick={() => this.handleApply(job)}>Apply</button>
                      {' '}
                      <button className="button warning" onClick={() => this.handleDismiss(job)}>Dismiss</button>
                    </div>
                    <JobCard
                      job={job}
                      Link={Link}
                      ctaButtons="lrg"
                    />
                  </div>
                </div>
              )}
            </div>

            <hr />

            <h2 className="subtitle"><strong>Your unsuccessful applications</strong></h2>
            <div className="columns is-multiline">
              {this.state.user.rejectedJobs && this.state.user.rejectedJobs.map((job, i) =>
                <div key={i} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                  <JobCard
                    job={job}
                    Link={Link}
                    ctaButtons="sml"
                  />
                </div>
              )}
            </div>
          </div>
        }

      </div>
    );
  }
}

export default UserShow;
