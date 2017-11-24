import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Profiles = new Mongo.Collection('profiles');

if(Meteor.isServer){
  Meteor.publish("profiles", function interfacesPublication(){
    return Profiles.find({owner: Meteor.userId()});
  });

}

Meteor.methods({
  'profiles.upsert'(owner, profile) {
    check(owner, String);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

      Profiles.upsert({owner: owner}, {$set:profile});

  },

});
