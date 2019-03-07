import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';


const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/link" component={Link}/>
      
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
