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

  // FILESTACK SETTINGS/ FUNCTIONS ================================================
  options = {
    fromSources: ['local_file_system','url','facebook','googledrive','dropbox','evernote','github','gmail','onedrive'],
    accept: ['.pdf','.doc','.docx','.docm','text/plain'],
    maxFiles: 1
  };

  handleFilestack = (result) => {
    this.setState({ cv: result.filesUploaded[0].url });
  }
  // ==============================================================================

  render() {
    return (
      <div className="container extra">
        <form onSubmit={this.handleSubmit}>
          <h1 className="title">User registration</h1>

          <div className="columns">
            <div className="column is-half-desktop is-half-tablet is-full-mobile">
              <RegisterForm handleChange={this.handleChange}/><br/>
              <div className="field">
                <label htmlFor="cv"><i className="fas fa-upload"></i>&nbsp; Upload your CV</label> <br />
                {this.state.cv && <p><a target="_blank" href={this.state.cv}>Preview your CV here</a></p>}
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
              <div className="field">
                {/* <label htmlFor="jobTitle">Job Title</label> */}
                <div className="control has-icons-left">
                  <input className="input"
                    placeholder="Current Job Title"
                    name="jobTitle"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-id-badge"></i></span>
                </div>
              </div>

              <div className="field">
                {/* <label htmlFor="yearsExp">Years of Experience</label> */}
                <div className="control has-icons-left">
                  <input
                    type="number"
                    className="input"
                    placeholder="Years of Experience"
                    name="yearsExp"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-graduation-cap"></i></span>
                </div>
              </div>

              <div className="field">
                {/* <label htmlFor="summary">Summary</label> */}
                <div className="control has-icons-left">
                  <textarea
                    className="textarea"
                    placeholder="&nbsp; &nbsp; &nbsp; &nbsp;Write a short bio"
                    name="summary"
                    onChange={this.handleChange}
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
            <label className="column is-2" htmlFor="frontend">Frontend</label>
            {Technologies.frontend.map((technology) =>
              <div key={technology.name} className="column is-2">
                <label className="checkbox">
                  <i className={technology.icon}></i> {technology.print} &nbsp;
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
            <label className="column is-2" htmlFor="backend">Backend</label>
            {Technologies.backend.map((technology) =>
              <div key={technology.name} className="column is-2">
                <label className="checkbox">
                  <i className={technology.icon}></i> {technology.print} &nbsp;
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

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default UserRegister;
