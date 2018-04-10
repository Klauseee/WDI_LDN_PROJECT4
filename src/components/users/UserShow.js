import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';
import UserMatchedJobs from './components/UserMatchedJobs';
import Auth from '../../lib/Auth';
import _ from 'lodash';

import { Link } from 'react-router-dom';

class UserShow extends React.Component {

  state = {
    user: {},
    technologies: {
      frontend: [],
      backend: []
    }
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

  handleApply = (jobId) => {
    console.log(jobId);
    //function for applying for job goes in here
    window.open('mailto:test@test.com');
  }

  handleDismiss = (jobId) => {
    const newMatchedJobs = _.filter(this.state.user.matchedJobs, (job) => job._id !== jobId);
    this.setState({ user: { matchedJobs: newMatchedJobs}}, () => axios.put(`/api/users/${this.props.match.params.id}`, { matchedJobs: this.state.user.matchedJobs})
      .then(res => console.log(res.data)));

  }

  render() {
    return(
      <div className="container">
        <h1 className="title">Your user profile</h1>
        <h1 className="title">{this.state.user.jobTitle}</h1>
        <h2 className="subtitle">Summary</h2>
        <p>{this.state.user.summary}</p>
        <h2 className="subtitle">Frontend Skills</h2>
        <ul>
          {this.state.technologies.frontend.map((technology, i) =>
            <li key={i}>{technology.name}<i className={technology.icon}></i></li>
          )}
        </ul>
        <h2 className="subtitle">Backend Skills</h2>
        <ul>
          {this.state.technologies.backend.map((technology, i) =>
            <li key={i}>{technology.name}<i className={technology.icon}></i></li>
          )}
        </ul>
        {Auth.getPayload().sub === this.state.user._id && <Link
          to={`/users/${this.state.user._id}/edit`}
          className="button is-primary">
          Edit
        </Link>}
        <UserMatchedJobs
          jobs={this.state.user.matchedJobs}
          handleApply={this.handleApply}
          handleDismiss={this.handleDismiss}
        />
      </div>
    );
  }
}

export default UserShow;
