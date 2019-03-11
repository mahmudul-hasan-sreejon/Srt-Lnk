import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import browserHistory from './../history';

import { Links } from './../api/links';


export default class Link extends React.Component {
  onLogout() {
    // logout user
    Accounts.logout();
  }

  onSubmit(e) {
    // prevent browser page refresh
    e.preventDefault();
    // get user url
    const url = this.refs.url.value.trim();

    if(url) {
      // insert url into database
      Links.insert({ url });
      // reset url ref.
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <h1>Your links...</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>

        <p>Add a Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type='text' ref='url' placeholder='url' />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
