import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';

class JobEdit extends React.Component {
  state = {
    title: '',
    location: '',
    summary: '',
    salary: '',
    type: '',
    technologies: {
      primary: [],
      secondary: []
    }
  }

  componentDidMount() {
    axios.get(`/api/jobs/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
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

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/jobs/${this.state._id}`, this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              className="input"
              placeholder="Whats the title of this role?"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input
              className="input"
              placeholder="Where would this role be located?"
              name="location"
              onChange={this.handleChange}
              value={this.state.location}
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
                checked={this.state.type === 'permanent'}
              />
              &nbsp; Permanent
            </label>
            <label className="radio">
              <input
                type="radio"
                name="type"
                value="contract"
                onChange={this.handleChange}
                checked={this.state.type === 'contract'}
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
              value={this.state.summary}
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
              value={this.state.salary}
            />
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default JobEdit;
