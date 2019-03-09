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


window.bh = browserHistory;

// user route access types
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  const pathname = browserHistory.location.pathname;

  if(Meteor.userId()) { // if a user has logged in
    browserHistory.replace('/links');
    return <Link />;
  }
  else if(pathname === '/') return <Login />;
  else if(pathname === '/signup') return <Signup />;
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
    return <Login />;
  }
  else return <Link />;
};

// app routes
const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={onEnterPublicPage} />
      <Route exact path="/signup" render={onEnterPublicPage} />
      <Route exact path="/links" render={onEnterPrivatePage} />

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
    browserHistory.replace('/links');
  }
  else if(isAuthenticatedPage && !isAuthenticated) { // if on authenticated page and user not logged in
    browserHistory.replace('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
