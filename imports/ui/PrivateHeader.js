import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';


const PrivateHeader = (props) => {
  const title = props.title;

  const onLogout = () => {
    // logout user
    Accounts.logout();
  };

  return (
    <div>
      <h1>{title}</h1>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;
