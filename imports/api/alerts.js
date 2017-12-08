import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Alerts = new Mongo.Collection('alerts');

if(Meteor.isServer){
  Meteor.publish("alerts", function alertsPublication(){
    return Alerts.find();
  });

}

Meteor.methods({
  'alerts.insert'(alert) {
      alert.createdAt = new Date(); // current time
      // Insert a task into the collection
      Alerts.insert(alert);

      Meteor.call('sms.send', alert);

  },


});
