import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';


// create 'links' collection
export const Links =  new Mongo.Collection('links');

// if in server then create a publication named 'links'
if(Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId });
  });
}

// 
Meteor.methods({
  'links.insert'(url) {
    // if no user is logged in then throw an error
    if(!this.userId) throw new Meteor.Error('not-authorized');

    // validate url
    new SimpleSchema({
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
      }
    }).validate({ url });

    // insert data
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

  'links.setVisibility'(_id, visible) {
    // if no user is logged in then throw an error
    if(!this.userId) throw new Meteor.Error('not-authorized');

    // validate link _id & visible
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: { type: Boolean }
    }).validate({ _id, visible });

    // update visibility
    Links.update(
      {
        _id,
        userId: this.userId
      },
      { $set: { visible } }
    );
  },

  'links.trackVisit'(_id) {
    // validate link _id
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    // update last visited time and increment visited count
    Links.update(
      { _id },
      {
        $set: { lastVisitedAt: new Date().getTime() },
        $inc: { visitedCount: 1 }
      }
    );
  }
});
