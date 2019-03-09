import React from 'react';
import browserHistory from './../history';


export default class Link extends React.Component {
  onLogout() {
    // goto root page after logout
    browserHistory.push('/');
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
