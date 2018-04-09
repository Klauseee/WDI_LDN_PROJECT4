import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';

import { Link } from 'react-router-dom';

class JobShow extends React.Component {
  state = {
    // keep this hidden, grab the employers ID from somewhere else.
    employer: {
      _id: '',
      name: ''
    },
    title: '',
    location: '',
    // permanent or contract
    type: '',
    technologies: {
      primary: [],
      secondary: []
    },
    summary: '',
    salary: 0,
    // show this only to the employer who made the job.
    interestedUsers: []
  }

  componentDidMount() {
    axios.get(`/api/jobs/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log('res', res.data)));
  }

  render() {
    console.log('employer', this.state.employer);
    if(!this.state) return null;
    return(
      <div className="container">
        <h1 className="title">{this.state.title}</h1>
        {/* <h2 className="subtitle"><Link to={`/employers/${this.state.employer}`}>{this.state.employer}</Link></h2> */}
        <h2 className="subtitle"><strong>Location:</strong> {this.state.location}</h2>
        <h2 className="subtitle"><strong>Employment type:</strong> {this.state.type}</h2>
        <h2 className="subtitle"><strong>Job summary</strong></h2>
        <p> {this.state.summary}</p>
        <h2 className="subtitle"><strong>Primary requirements</strong></h2>
        <ul className="columns">
          {Technologies.frontend.map(technology =>
            this.state.technologies.primary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
          {Technologies.backend.map(technology =>
            this.state.technologies.primary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
        </ul>
        <h2 className="subtitle"><strong>Secondary requirements</strong></h2>
        <ul className="columns">
          {Technologies.frontend.map(technology =>
            this.state.technologies.secondary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
          {Technologies.backend.map(technology =>
            this.state.technologies.secondary.includes(technology.name) && <li key={technology.name}><i className={`column ${technology.icon}`}></i></li>
          )}
        </ul>
        <h2 className="subtitle"><strong>Salary:</strong> £{this.state.salary}</h2>
      </div>
    );
  }
}

export default JobShow;
