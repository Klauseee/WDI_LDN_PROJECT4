import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import Flash from '../../lib/Flash';

import Repeater from '../common/Repeater.js';

class EditRoute extends React.Component {

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

  componentDidMount() {
    // console.log(this.props); // everything here has been created by the router
    axios.get(`/api/employers/${this.props.match.params.id}`)
      .then(res => this.setState( res.data ));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/employers/${this.props.match.params.id}`, this.state)
    // send the form data
    // set token inside local storage
      // .then(res => localStorage.setItem('token', res.data.token)) // replace using helper methods created in lib/Auth
      // .then(res => Auth.setToken(res.data.token))
      // .then(() => Flash.setMessage('success', 'Thanks for registering!'))
      .then(() => this.props.history.push(`/employers/${this.props.match.params.id}`));
  }

  handleRepeaterChange = (property, array, index, e) => {
    const newArray = array.slice();
    newArray[index] = e.target.value;
    this.setState({ [property]: newArray }
      // , () => console.log(this.state[property])
    );
  }

  addRepeaterInput = (property, array) => {
    this.setState({ [property]: array.concat('') }
      // , () => console.log(this.state[property])
    );
  }

  removeRepeaterInput = (property, array, index) => {
    this.setState({ [property]: array.filter((item, i) => item[i] !== item[index])}
      // , () => console.log(this.state[property])
    );
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>

          {/* THIS WILL BE INITIAL REGISTER */}
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
          <div className="field">
            <label htmlFor="password">Password</label>
            <p>GIVE OPTION TO CHANGE PASSWORD HERE?</p>
          </div>

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
          <div className="field">
            <label htmlFor="logo">Company Logo</label>
            <input
              className="input"
              placeholder="In the form of a link.. REMEMBER TO ADD FILESTACK OPTION"
              name="logo"
              value={this.state.logo}
              onChange={this.handleChange}
            />
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
          <div className="field">
            <label htmlFor="listings">Company Job Listings</label>
            <p>Add a job, ADD FUNCTIONALITY FOR THIS TO HAPPEN, SAVE JOB ID TO THIS.STATE.LISTINGS ARRAY</p>
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default EditRoute;
