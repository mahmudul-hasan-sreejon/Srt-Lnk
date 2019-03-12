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
