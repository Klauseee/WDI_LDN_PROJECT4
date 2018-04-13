import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';
import Flash from '../../lib/Flash';

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

  // GET THE JOB OBJECT
  componentDidMount() {
    axios.get(`/api/jobs/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  // SET STATE AFTER CHANGES TO THE JOB OBJECT IS MADE
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  // HANDLE CHECKBOXES
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

  // UPDATE JOB RECORD
  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/jobs/${this.state._id}`, this.state)
      .then(() => Flash.setMessage('success', 'Your changes have been saved!'))
      .then(() => this.props.history.push(`/jobs/${this.props.match.params.id}`));
  }

  render() {
    return(
      <div className="container extra">
        <h1 className="title">Edit your job listing</h1>
        <hr/>
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
                    value={this.state.title}
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
                    value={this.state.location}
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

              <div className="field">
                {/* <label htmlFor="summary">Job Summary</label> */}
                <div className="control has-icons-left">
                  <textarea
                    className="textarea text-area-pad"
                    placeholder="Write a short summary about this job"
                    name="summary"
                    onChange={this.handleChange}
                    value={this.state.summary}
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
                    value={this.state.salary}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-money-bill-alt"></i></span>
                </div>
              </div>

            </div>
            <div className="column is-half-desktop is-half-tablet is-full-mobile">

              <table>
                <tbody>
                  <tr>
                    <td><strong>Frontend</strong></td>
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
                          checked={this.state.technologies.primary.includes(technology.name)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="secondary"
                          onChange={this.handleCheck}
                          value={technology.name}
                          checked={this.state.technologies.secondary.includes(technology.name)}
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="padding-top"><strong>Backend</strong></td>
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
                          checked={this.state.technologies.primary.includes(technology.name)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="secondary"
                          onChange={this.handleCheck}
                          value={technology.name}
                          checked={this.state.technologies.secondary.includes(technology.name)}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>

          </div>

          <div className="cta-caddy">
            <button className="button success cta">Submit</button>
          </div>
        </form>

      </div>
    );
  }
}

export default JobEdit;
