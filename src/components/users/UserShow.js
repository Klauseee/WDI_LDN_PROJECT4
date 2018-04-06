import React from 'react';
import axios from 'axios';

class UserShow extends React.Component {

  state = {
    user: null
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, () => console.log(this.state.user)));
  }

  render() {
    return(
      <p>User Page</p>
    );
  }
}

export default UserShow;
