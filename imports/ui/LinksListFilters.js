import React from 'react';
import { Session } from 'meteor/session';

export default () => {
  const checkVisibility = (e) => {
    const status = e.target.checked;

    // update session variable
    Session.set('showVisible', !status);
  };

  return (
    <div>
      <label>
        <input type="checkbox" onChange={checkVisibility} />
        show hidden links
      </label>
    </div>
  );
};
