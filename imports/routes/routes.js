import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import browserHistory from './../history';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';


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

// authenticate page changes
export const onAuthChange = (isAuthenticated) => {
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
};


// app routes
export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={onEnterPublicPage} />
      <Route exact path="/signup" render={onEnterPublicPage} />
      <Route exact path="/links" render={onEnterPrivatePage} />

      <Route component={NotFound}/>
    </Switch>
  </Router>
);
