import React from 'react';

class Repeater extends React.Component {

  state = {
    photos: ['']
  }

  handleChange = (index, e) => {
    const photos = this.state.photos.slice();
    photos[index] = e.target.value;
    this.setState({ photos });
  }

  addInput = () => {
    this.setState({ photos: this.state.photos.concat('') }, () => console.log(this.state.photos));
  }

  removeInput = (index) => {
    this.setState({ photos: this.state.photos.filter((photo, i) => photo[i] !== photo[index])}, () => console.log(this.state.photos));
  }

  render () {
    // console.log(this.state);
    return (
      <div>
        {this.state.photos.map((photo, i) =>
          <div key={i}>
            <input
              className="input"
              placeholder="Add a photo"
              name="photos"
              value={photo}
              onChange={(e) => this.handleChange(i, e)}
            />
            <p onClick={() => this.removeInput(i)}>- remove photo</p>
          </div>
        )}
        <p onClick={this.addInput}>+ add another photo</p>
      </div>
    );
  }
}

export default Repeater;

// export { this.state.photos as photos };
