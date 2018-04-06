import React from 'react';
import axios from 'axios';
// import Form from './Form';
import Auth from '../../lib/Auth';

class EditRoute extends React.Component {

  state = {
    email: '',
    name: '',
    logo: '',
    info: '',
    photos: [],
    perks: [],
    listings: '',
    location: '',
    employer: ''
  }

  componentDidMount() {
    // console.log(this.props); // everything here has been created by the router
    axios.get(`/api/employers/${this.props.match.params.id}`)
      .then(res => this.setState( res.data, () => {
        console.log(this.state);
      }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    axios.put(`/api/employers/${this.props.match.params.id}`, this.state, {
      // if this header exists and the token is valid.. then proceed.
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/employers/${this.props.match.params.id}`));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="container">
        {/* // may want to seperate forms, do not forget to create props so the form can run the correct functions */}
        {/* <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        /> */}

        
      </div>
    );
  }
}

export default EditRoute;
