import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Interfaces = new Mongo.Collection('interfaces');

if(Meteor.isServer){
  Meteor.publish("interfaces", function interfacesPublication(){
    return Interfaces.find({owner: this.userId});
  });

}

Meteor.methods({
  'interfaces.insert'(interface) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
      // Insert a task into the collection
      Interfaces.insert(interface);

  },
  'interfaces.update'(interface) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
      // Insert a task into the collection
      Interfaces.update({_id: interface._id}, {$set: interface});


  },
  'interfaces.remove'(interfaceId) {
    check(interfaceId, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    if (!this.isSimulation) {
    Interfaces.remove(interfaceId);
  }
  },

});
