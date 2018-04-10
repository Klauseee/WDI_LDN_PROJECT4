import React from 'react';
import axios from 'axios';

import ReactFilestack from 'filestack-react';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import Technologies from '../../lib/Technologies';

import RegisterForm from './RegisterForm';

class UserRegister extends React.Component {

  state = {
    technologies: {
      frontend: [],
      backend: []
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
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
    this.setState({ technologies: { [name]: newTechnologies, [other]: this.state.technologies[other]}});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Welcome to Jibbly Jobbly!'))
      .then(() => this.props.history.push('/'));
  }

  options = {
    fromSources: ['local_file_system','url','facebook','googledrive','dropbox','evernote','github','gmail','onedrive'],
    accept: ['.pdf','.doc','.docx','.docm','text/plain'],
    maxFiles: 1
  };

  handleFilestack = (result) => {
    this.setState({ cv: result.filesUploaded[0].url });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1 className="title">User registration</h1>

          <RegisterForm handleChange={this.handleChange}/><br/>

          <div className="field">
            <label htmlFor="jobTitle">Job Title</label>
            <input className="input"
              placeholder="Job Title"
              name="jobTitle"
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="summary">Summary</label>
            <textarea
              className="textarea"
              placeholder="Write a short summary about yourself"
              name="summary"
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
              onChange={this.handleChange}
            />
          </div>
          <div className="field columns is-multiline">
            <label className="column" htmlFor="frontend">Frontend Technologies</label>
            {Technologies.frontend.map((technology) =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="frontend"
                    onChange={this.handleCheck}
                    value={technology.name}
                  />
                </label>
              </div>
            )}

          </div>
          <div className="field columns is-multiline">
            <label className="column" htmlFor="backend">Backend Technologies</label>
            {Technologies.backend.map((technology) =>
              <div key={technology.name} className="column">
                <label className="checkbox">
                  <i className={technology.icon}></i>
                  <input
                    type="checkbox"
                    name="backend"
                    onChange={this.handleCheck}
                    value={technology.name}
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

export default UserRegister;
