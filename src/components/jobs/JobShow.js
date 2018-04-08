import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';

class JobShow extends React.Component {
  state = null

  componentDidMount() {
    axios.get(`/api/jobs/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .then(() => this.getEmployer());
  }

  getEmployer() {
    axios.get(`/api/employers/${this.state.employer}`)
      .then(res => this.setState({ employerInfo: res.data }));
  }


  render() {
    if(!this.state) return null;
    console.log(this.state.employerInfo);
    return(
      <div className="container">
        <h1 className="title">{this.state.title}</h1>
        {/* <h2 className="subtitle">{this.state.employerInfo.name}</h2> */}
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
