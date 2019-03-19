import React from 'react';
import { Meteor } from 'meteor/meteor';


export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    }
  }
  
  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();

    // get user url
    const url = this.state.url;

    if(url) {
      // insert url into database
      Meteor.call('links.insert', url, (err) => {
        if(!err) {
          // reset state url
          this.setState({ url: '' });
        }
      });
    }
  }

  onChange(e) {
    // update state url
    this.setState({
      url: e.target.value
    });
  }

  render() {
    return (
      <div>
      <p>Add a Link</p>

      <form onSubmit={this.onSubmit.bind(this)}>
        <input type='text' placeholder='URL' value={this.state.url} onChange={this.onChange.bind(this)} />
        <button>Add Link</button>
      </form>
      </div>
    );
  }
}
