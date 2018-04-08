import React from 'react';
import axios from 'axios';

class JobShow extends React.Component {
  state = {}

  componentWillMount() {
    console.log('Jobs Show');
  }

  componentDidMount() {
    axios.get('/api/jobs')
      .then(res => this.setState(res.data), () => console.log(this.state));
  }

  render() {
    return(
      <div className="container">
        <h2 className="title">Job Title</h2>
      </div>
    );
  }
}

export default JobShow;
