import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Components = new Mongo.Collection('components');

if(Meteor.isServer){
  Meteor.publish("components", function interfacesPublication(){
    return Components.find({owner: this.userId});
  });

}

Meteor.methods({
  'components.insert'(component) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
      // Insert a task into the collection
      Components.insert(component);

  },
  'components.update'(component) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
      // Insert a task into the collection
      Components.update({_id: component._id}, {$set: component});


  },
  'components.remove'(componentId) {
    check(componentId, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    if (!this.isSimulation) {
    Components.remove(componentId);
  }
  },

});
