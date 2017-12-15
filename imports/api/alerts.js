import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Alerts = new Mongo.Collection('alerts');

if(Meteor.isServer){
  Meteor.publish("alerts", function alertsPublication(){
    return Alerts.find();
  });

  Meteor.setInterval(function(){
    Meteor.call('alerts.clean');
  }, 60000);

}

Meteor.methods({
  'alerts.insert'(alert) {
      alert.createdAt = new Date(); // current time
      // Insert a task into the collection
      Alerts.insert(alert);

  },
  'alerts.clean'() {

    const start = new Date();
    start.setMonth(start.getMonth()-1);

    Alerts.remove({createdAt: {"$lt" : start}});

    console.log("Clean has been run on records older than : " + start);

    },


});
