import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';


// create 'links' collection
export const Links =  new Mongo.Collection('links');

// if in server then create a publication named 'links'
if(Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({userId: this.userId});
  });
}

// 
Meteor.methods({
  'links.insert'(url) {
    // if no user is logged in then throw an error
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // validate url
    try {
      new SimpleSchema({
        url: {
          type: String,
          regEx: SimpleSchema.RegEx.Url,
        }
      }).validate({ url });
    } catch (err) { // if not valid throw an meteor error
      throw new Meteor.Error(400, err.message);
    }

    // insert url
    Links.insert({
      url,
      userId: this.userId
    });
  }
});
