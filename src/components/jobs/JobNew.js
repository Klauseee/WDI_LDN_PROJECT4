import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';
// import Form from './Form';
import Auth from '../../lib/Auth';

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
    axios.post('/api/jobs', this.state,
      { headers: { Authorization: `Bearer ${Auth.getToken()}` }}
    )
      .then(res => console.log('saved job', res))
      .then(() => this.props.history.push(`/employers/${Auth.getPayload().sub}`))
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
    this.setState({ technologies: { [name]: newTechnologies, [other]: this.state.technologies[other]}}, () => console.log(this.state.technologies));
  }

  render() {
    return (
      <div className="container extra">
        <h1 className="title">Create a new listing</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="columns">
            <div className="column is-half-desktop is-half-tablet is-full-mobile">

              <div className="field">
                {/* <label htmlFor="title">Title</label> */}
                <div className="control has-icons-left">
                  <input
                    className="input"
                    placeholder="Job Title"
                    name="title"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-id-badge"></i></span>
                </div>
              </div>

              <div className="field">
                {/* <label htmlFor="location">Location</label> */}
                <div className="control has-icons-left">
                  <input
                    className="input"
                    placeholder="Job Location"
                    name="location"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-map-marker"></i></span>
                </div>
              </div>

              <div className="field">
                <label htmlFor="type"><strong>Type of Role</strong></label><br />
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

              <div className="field">
                {/* <label htmlFor="summary">Job Summary</label> */}
                <div className="control has-icons-left">
                  <textarea
                    className="textarea text-area-pad"
                    placeholder="Write a short summary about this job"
                    name="summary"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-info-circle"></i></span>
                </div>
              </div>

              <div className="field">
                {/* <label htmlFor="salary">Salary</label> */}
                <div className="control has-icons-left">
                  <input
                    type="number"
                    className="input"
                    placeholder={this.state.type === 'contract' ? 'Pay per day' : 'Pay per annum'}
                    name="salary"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-money-bill-alt"></i></span>
                </div>
              </div>

            </div>
            <div className="column is-half-desktop is-half-tablet is-full-mobile">

              <table>
                <tbody>
                  <tr>
                    <td className="underline">Frontend</td>
                    <td><strong>Primary</strong></td>
                    <td><strong>Secondary</strong></td>
                  </tr>
                  {Technologies.frontend.map((technology, i) =>
                    <tr key={i}>
                      <td><i className={technology.icon}></i> {technology.print}</td>
                      <td>
                        <input
                          type="checkbox"
                          name="primary"
                          onChange={this.handleCheck}
                          value={technology.name}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="secondary"
                          onChange={this.handleCheck}
                          value={technology.name}
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="underline">Backend</td>
                    <td></td>
                    <td></td>
                  </tr>
                  {Technologies.backend.map((technology, i) =>
                    <tr key={i}>
                      <td><i className={technology.icon}></i> {technology.print}</td>
                      <td>
                        <input
                          type="checkbox"
                          name="primary"
                          onChange={this.handleCheck}
                          value={technology.name}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="secondary"
                          onChange={this.handleCheck}
                          value={technology.name}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>

          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default JobNew;
