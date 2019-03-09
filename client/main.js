import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import browserHistory from './../imports/history';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';


// window.b = browserHistory;

// user route access types
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

// app routes
const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/links" component={Link}/>

      <Route component={NotFound}/>
    </Switch>
  </Router>
);

// track user authentication status
Tracker.autorun(() => {
  // get user authentication status
  const isAuthenticated = !!Meteor.userId();
  // get current browser path
  const pathname = browserHistory.location.pathname;
  // get current page' authentication status
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // check authentication and redirect accordingly
  if(isUnauthenticatedPage && isAuthenticated) { // if on unauthenticated page and user logged in
    browserHistory.push('/links');
  }
  else if(isAuthenticatedPage && !isAuthenticated) { // if on authenticated page and user not logged in
    browserHistory.push('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
