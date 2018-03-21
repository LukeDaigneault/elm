import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
  Meteor.publish("profiles", function profilesPublication() {
    return Profiles.find({ owner: this.userId });
  });


  Meteor.methods({
    'profiles.upsert' (owner, username, profile) {
      check(owner, String);
      // Make sure the user is logged in before inserting a task
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      Profiles.upsert({ owner: owner }, { $set: profile });

      if (username) {
        Accounts.setUsername(owner, username);
      }
    },

  });

}
