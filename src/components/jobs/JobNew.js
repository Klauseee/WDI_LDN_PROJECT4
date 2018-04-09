import React from 'react';
import axios from 'axios';
// import Form from './Form';
import Auth from '../../lib/Auth';
import Technologies from '../../lib/Technologies';

class JobNew extends React.Component {

  state = {
    // keep this hidden, grab the employers ID from somewhere else.
    employer: '',
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

  componentWillMount() {
    this.setState({ employer: Auth.getPayload().sub }, () => console.log('employerID', Auth.getPayload().sub));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/jobs', this.state
    // { headers: { Authorization: `Bearer ${Auth.getToken()}` }}
    )
      .then(res => console.log('saved job', res))
      .then(() => this.props.history.push('/jobs'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleChange = ({ target: { name, value }}) => {
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleCheck = ({ target: { name, value, checked }}) => {
    let newTechnologies;
    if(checked) {
      newTechnologies = this.state.technologies[name].concat(value);
    } else {
      newTechnologies = this.state.technologies[name].slice();
      const index = newTechnologies.indexOf(value);
      newTechnologies.splice(index, 1);
    }
    const other = name === 'primary' ? 'secondary' : 'primary';
    this.setState({ technologies: { [name]: newTechnologies, [other]: this.state.technologies[other] }}, () => console.log(this.state.technologies));
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {/* <div className="field">
            <label htmlFor="employer">Employer</label>
            <input
              className="input"
              placeholder="Employer ID, this will be hidden/ value will be automatically assigned as the id of the logged in employer"
              name="employer"
              onChange={this.handleChange}
            />
          </div> */}
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              className="input"
              placeholder="Whats the title of this role?"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input
              className="input"
              placeholder="Where would this role be located?"
              name="location"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="type">Type of Role</label><br />
            <label className="radio">
              <input
                type="radio"
                name="type"
                value="permanent"
                onChange={this.handleChange}
              />
              &nbsp; Permanent
            </label>
            <label className="radio">
              <input
                type="radio"
                name="type"
                value="contract"
                onChange={this.handleChange}
              />
              &nbsp; Contract
            </label>
          </div>
          <div className="field columns is-multiline">
            <label htmlFor="logo">Primary Skills</label>
            {Technologies.frontend.map(technology =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="primary"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.primary.includes(technology.name)}
                  />
                </label>
              </div>
            )}
            {Technologies.backend.map(technology =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="primary"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.primary.includes(technology.name)}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="field columns is-multiline">
            <label htmlFor="logo">Secondary Skills</label>
            {Technologies.frontend.map(technology =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="secondary"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.secondary.includes(technology.name)}
                  />
                </label>
              </div>
            )}
            {Technologies.backend.map(technology =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="secondary"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.secondary.includes(technology.name)}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="field">
            <label htmlFor="summary">Job Summary</label>
            <textarea
              className="textarea"
              placeholder="Write a summary about this role"
              name="summary"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              className="input"
              placeholder="Pay per annum, make this change according to what was selected for type (ie: day rate/ annual wage)"
              name="salary"
              onChange={this.handleChange}
            />
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default JobNew;
