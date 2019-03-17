import React from 'react';
import { Meteor } from 'meteor/meteor';


export default class AddLink extends React.Component {
  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();
    // get user url
    const url = this.refs.url.value.trim();

    if(url) {
      // insert url into database
      Meteor.call('links.insert', url);

      // reset url ref.
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
      <p>Add a Link</p>

      <form onSubmit={this.onSubmit.bind(this)}>
        <input type='text' ref='url' placeholder='url' />
        <button>Add Link</button>
      </form>
      </div>
    );
  }
}
