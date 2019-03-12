import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


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
  // insert a link
  'links.insert'(url) {
    // if no user is logged in then throw an error
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Links.insert({
      url,
      userId: this.userId
    });
  }
});
