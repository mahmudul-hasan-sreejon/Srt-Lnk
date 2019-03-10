import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes'


// track user authentication status
Tracker.autorun(() => {
  // get user authentication status
  const isAuthenticated = !!Meteor.userId();
  // authenticate page change
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  // render the app
  ReactDOM.render(routes, document.getElementById('app'));
});
