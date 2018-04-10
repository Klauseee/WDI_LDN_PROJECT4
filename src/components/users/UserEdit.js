import React from 'react';
import axios from 'axios';
// import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import Technologies from '../../lib/Technologies';

import ReactFilestack from 'filestack-react';

class UserEdit extends React.Component {

  state = {
    jobTitle: '',
    email: '',
    summary: '',
    yearsExp: 0,
    technologies: {
      frontend: [],
      backend: []
    }
  };

  // GET USER OBJECT
  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
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
    const other = name === 'frontend' ? 'backend' : 'frontend';
    this.setState({ technologies: { [name]: newTechnologies, [other]: this.state.technologies[other] }}, () => console.log(this.state));
  }

  // UPDATE USER IN DATABASE
  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${this.state._id}`, this.state)
      .then(() => Flash.setMessage('success', 'Profile updated'))
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`));
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Edit your user profile</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="jobTitle">Job Title</label>
            <input className="input"
              placeholder="Job Title"
              name="jobTitle"
              value={this.state.jobTitle}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="summary">Summary</label>
            <textarea
              className="textarea"
              placeholder="Write a short summary about yourself"
              name="summary"
              value={this.state.summary}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="yearsExp">Years of Experience</label>
            <input
              type="number"
              className="input"
              placeholder="Years of experience"
              name="yearsExp"
              value={this.state.yearsExp}
              onChange={this.handleChange}
            />
          </div>
          <div className="field columns is-multiline">
            <label htmlFor="frontend">Frontend Technologies</label>
            {Technologies.frontend.map((technology) =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="frontend"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.frontend.includes(technology.name)}
                  />
                </label>
              </div>
            )}

          </div>
          <div className="field columns is-multiline">
            <label htmlFor="backend">Backend Technologies</label>
            {Technologies.backend.map((technology) =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="backend"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.backend.includes(technology.name)}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="field">
            <label htmlFor="cv">Upload your CV</label> <br />
            {this.state.cv && <p><a target="_blank" href={this.state.cv}>Preview your CV here</a></p>}
            <ReactFilestack
              apikey='AWp9DCV3vTIOqEGF0KjsPz'
              buttonText="Click to upload"
              buttonClass="button"
              options={this.options}
              onSuccess={res => this.handleFilestack(res)}
            />
          </div>

          <button className="button is-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserEdit;
