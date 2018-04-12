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
      <div className="container extra">
        <h1 className="title">Edit your user profile</h1>
        <hr/>
        <form onSubmit={this.handleSubmit}>

          <div className="columns">
            <div className="column is-half-desktop is-half-tablet is-full-mobile">

              {/* email */}
              <div className="field">
                {/* <label htmlFor="email">Email</label> */}
                <div className="control has-icons-left">
                  <input
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                </div>
              </div>

              {/* cv */}
              <div className="field">
                <label htmlFor="cv"><i className="fas fa-upload"></i>&nbsp; <strong>Upload your CV</strong></label> <br />
                {this.state.cv && <p><a target="_blank" href={this.state.cv}><strong>Preview your CV here</strong></a></p>}
                <ReactFilestack
                  apikey='AWp9DCV3vTIOqEGF0KjsPz'
                  buttonText="Click to upload"
                  buttonClass="button"
                  options={this.options}
                  onSuccess={res => this.handleFilestack(res)}
                />
              </div>

            </div>
            <div className="column is-half-desktop is-half-tablet is-full-mobile">
              {/* job title */}
              <div className="field">
                {/* <label htmlFor="jobTitle">Job Title</label> */}
                <div className="control has-icons-left">
                  <input className="input"
                    placeholder="Current Job Title"
                    name="jobTitle"
                    onChange={this.handleChange}
                    value={this.state.jobTitle}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-id-badge"></i></span>
                </div>
              </div>

              {/* years exp */}
              <div className="field">
                {/* <label htmlFor="yearsExp">Years of Experience</label> */}
                <div className="control has-icons-left">
                  <input
                    type="number"
                    className="input"
                    placeholder="Years of Experience"
                    name="yearsExp"
                    onChange={this.handleChange}
                    value={this.state.yearsExp}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-graduation-cap"></i></span>
                </div>
              </div>

              {/* summary */}
              <div className="field">
                {/* <label htmlFor="summary">Summary</label> */}
                <div className="control has-icons-left">
                  <textarea
                    className="textarea text-area-pad"
                    placeholder="Write a short bio"
                    name="summary"
                    onChange={this.handleChange}
                    value={this.state.summary}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-info-circle"></i></span>
                </div>

              </div>
            </div>
          </div>

          <div className="field">
            <label className="subtitle">SHOW ME WOT U GOT:</label>
          </div>
          <div className="field columns is-multiline">
            <label className="column is-2" htmlFor="frontend"><strong>Frontend</strong></label>
            {Technologies.frontend.map((technology) =>
              <div key={technology.name} className="column is-2">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="frontend"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.frontend.includes(technology.name)}
                  />
                  &nbsp; <i className={technology.icon}></i> {technology.print}
                </label>
              </div>
            )}

          </div>
          <div className="field columns is-multiline">
            <label className="column is-2" htmlFor="backend"><strong>Backend</strong></label>
            {Technologies.backend.map((technology) =>
              <div key={technology.name} className="column is-2">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="backend"
                    onChange={this.handleCheck}
                    value={technology.name}
                    checked={this.state.technologies.backend.includes(technology.name)}
                  />
                  &nbsp; <i className={technology.icon}></i> {technology.print}
                </label>
              </div>
            )}

          </div>

          <button className="button">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserEdit;
