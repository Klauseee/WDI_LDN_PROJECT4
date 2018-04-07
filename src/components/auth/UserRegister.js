import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import Flash from '../../lib/Flash';
import Technologies from '../../lib/Technologies';

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
    let other;
    name === 'frontend' ? other = 'backend' : other = 'frontend';
    this.setState({ technologies: { [name]: newTechnologies, [other]: this.state.technologies[other]}});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      // .then(() => Flash.setMessage('success', 'Welcome to Jibbly Jobbly!'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="jobTitle">Job Title</label>
          <input className="input"
            placeholder="Job Title"
            name="jobTitle"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            className="input"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="summary">Summary</label>
          <textarea
            className="input"
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
                />
              </label>
            </div>
          )}
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default UserRegister;
