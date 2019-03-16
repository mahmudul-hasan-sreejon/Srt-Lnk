import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/startup/simple-schema-config';

import './../imports/api/users';
import { Links } from './../imports/api/links';


Meteor.startup(() => {
  // check current pages' connect handlers in the middleware
  WebApp.connectHandlers.use((req, res, next) => {
    // get the id form the url
    const _id = req.url.slice(1);
    // find the url _id
    const link = Links.findOne({ _id });
    
    if(link) {
      // set http status code
      res.statusCode = 302;
      // set http headers to redirect it's location
      res.setHeader('Location', link.url);
      // end http request
      res.end();
    }
    else next();
  });
});
