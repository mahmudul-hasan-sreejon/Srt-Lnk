import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import browserHistory from './../history';


export default class Link extends React.Component {
  onLogout() {
    // logout user
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <h1>Your links...</h1>

        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}
