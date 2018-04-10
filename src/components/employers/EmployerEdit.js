import React from 'react';
import axios from 'axios';
import ReactFilestack from 'filestack-react';
// import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import Repeater from '../common/Repeater.js';

class EmployerEdit extends React.Component {

  state = {
    email: '',
    name: '',
    logo: '',
    info: '',
    photos: [],
    perks: [],
    listings: [],
    location: '',
    employer: ''
  }

  // GET EXISTING EMPLOYER OBJECT & SET IN STATE
  componentDidMount() {
    axios.get(`/api/employers/${this.props.match.params.id}`)
      .then(res => this.setState( res.data ));
  }

  // FUNCTION TO MAKE CHANGES TO EXISTING EMPLOYER OBJECT.
  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  // UPDATE RECORD IN DATABASE
  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/employers/${this.props.match.params.id}`, this.state)
    // send the form data
    // set token inside local storage
      // .then(res => localStorage.setItem('token', res.data.token)) // replace using helper methods created in lib/Auth
      // .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Thanks for registering!'))
      .then(() => this.props.history.push(`/employers/${this.props.match.params.id}`));
  }

  // REPEATER COMPONENT FUNCTIONS =================================================
  handleRepeaterChange = (property, array, index, e) => {
    const newArray = array.slice();
    newArray[index] = e.target.value;
    this.setState({ [property]: newArray }
    );
  }

  addRepeaterInput = (property, array) => {
    this.setState({ [property]: array.concat('') }
    );
  }

  removeRepeaterInput = (property, array, index) => {
    this.setState({ [property]: array.filter((item, i) => item[i] !== item[index])}
    );
  }
  // ==============================================================================

  // FILESTACK SETTINGS/ FUNCTIONS ================================================
  options = {
    fromSources: ['local_file_system','url','imagesearch','facebook','instagram','googledrive','dropbox','gmail'],
    accept: ['image/*','.pdf'],
    maxFiles: 1,
    transformations: {
      crop: {
        force: true,
        aspectRatio: 1
      }
    }
  }

  handleFilestack = (result) => {
    this.setState({ logo: result.filesUploaded[0].url });
  }
  // ==============================================================================

  render() {
    return (
      <div className="container">
        <h1 className="title">Edit your employer profile</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="example@email.com"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          {/* <div className="field">
            <label htmlFor="password">Password</label>
            <p>GIVE OPTION TO CHANGE PASSWORD HERE?</p>
          </div> */}

          {/* REST OF THE HENCH FORM */}
          <div className="field">
            <label htmlFor="name">Company Name</label>
            <input
              className="input"
              placeholder="My company"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="field columns">
            <div className="column">
              <label htmlFor="logo">Upload Company Logo</label><br />
              <ReactFilestack
                apikey='AWp9DCV3vTIOqEGF0KjsPz'
                buttonText="Click to upload"
                buttonClass="button"
                options={this.options}
                onSuccess={res => this.handleFilestack(res)}
              />
            </div>
            {this.state.logo && <p className="column">Preview your current logo: <br/> <img src={this.state.logo} /></p>}
          </div>

          <div className="field">
            <label htmlFor="location">Company Location</label>
            <input
              className="input"
              placeholder="Where are you situated?"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="info">Company Info</label>
            <input
              className="input"
              placeholder="Write a little blurb about your company"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="photos">Company Photos</label>
            <Repeater
              handleRepeaterChange={this.handleRepeaterChange}
              addRepeaterInput={this.addRepeaterInput}
              removeRepeaterInput={this.removeRepeaterInput}
              array={this.state.photos}
              property='photos'
            />
          </div>

          <div className="field">
            <label htmlFor="photos">Company Perks</label>
            <Repeater
              handleRepeaterChange={this.handleRepeaterChange}
              addRepeaterInput={this.addRepeaterInput}
              removeRepeaterInput={this.removeRepeaterInput}
              array={this.state.perks}
              property='perks'
            />
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default EmployerEdit;
