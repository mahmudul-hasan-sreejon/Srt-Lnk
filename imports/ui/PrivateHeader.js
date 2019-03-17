import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';


export default class PrivateHeader extends React.Component {
  onLogout() {
    // logout user
    Accounts.logout();
  }

  render() {
    const title = this.props.title;
    return (
      <div>
        <h1>{title}</h1>

        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}
