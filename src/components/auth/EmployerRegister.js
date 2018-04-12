import React from 'react';
import axios from 'axios';
import ReactFilestack from 'filestack-react';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import RegisterForm from './RegisterForm';

import Repeater from '../common/Repeater.js';

class EmployerRegister extends React.Component {

  state = {
    photos: [''],
    perks: ['']
    // listings: []
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/employers/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Thanks for registering!'))
      .then(() => this.props.history.push('/employers'));
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
  };

  handleFilestack = (result) => {
    this.setState({ logo: result.filesUploaded[0].url });
  }
  // ==============================================================================

  render() {
    return (
      <div className="container extra">
        <h1 className="title">Employer registration</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="columns">

            <div className="column is-half-desktop is-half-tablet is-full-mobile">

              <RegisterForm handleChange={this.handleChange}/><br/>
              <div className="field columns">
                <div className="column">
                  <label htmlFor="logo"><i className="fas fa-upload"></i>&nbsp; Upload Company Logo</label><br />
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

            </div>
            <div className="column is-half-desktop is-half-tablet is-full-mobile">

              <div className="field">
                {/* <label htmlFor="name">Company Name</label> */}
                <div className="control has-icons-left">
                  <input
                    className="input"
                    placeholder="Company Name"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-building"></i></span>
                </div>
              </div>
              <div className="field">
                {/* <label htmlFor="location">Company Location</label> */}
                <div className="control has-icons-left">
                  <input
                    className="input"
                    placeholder="Company location"
                    name="location"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-map-marker"></i></span>
                </div>
              </div>
              <div className="field">
                {/* <label htmlFor="info">Company Info</label> */}
                <div className="control has-icons-left">
                  <textarea
                    className="textarea text-area-pad"
                    placeholder="A little blurb about your company"
                    name="info"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-info-circle"></i></span>
                </div>
              </div>

            </div>

          </div>


          <div className="field">
            {/* <label htmlFor="photos">Company Photos</label> */}
            <Repeater
              handleRepeaterChange={this.handleRepeaterChange}
              addRepeaterInput={this.addRepeaterInput}
              removeRepeaterInput={this.removeRepeaterInput}
              array={this.state.photos}
              property='photos'
              placeholderText='Company photo link'
              icon='image'
            />
          </div>

          <div className="field">
            {/* <label htmlFor="photos">Company Perks</label> */}
            <Repeater
              handleRepeaterChange={this.handleRepeaterChange}
              addRepeaterInput={this.addRepeaterInput}
              removeRepeaterInput={this.removeRepeaterInput}
              array={this.state.perks}
              property='perks'
              placeholderText='Company perks'
              icon='thumbs-up'
            />
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    );
  }
}

export default EmployerRegister;
