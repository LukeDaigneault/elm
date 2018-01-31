import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Components } from '../../api/components.js';

import './component.js';
import './componentModal.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('components');
});

Template.componentModal.onDestroyed(function () {
  Session.set("selectedComponent", "");
});

Template.componentModal.helpers({
  'components': function() {

    return Components.find({owner: Meteor.userId(), interfaceOwner: Session.get("selectedInterface")}, {sort: {componentName: 1} });
  },
  'selectedComponent': function() {
    if (Session.get("selectedComponent") != ''){
    return Components.findOne({owner: Meteor.userId(), _id: Session.get("selectedComponent") });
  }else{
    return null;
  }
  },

});

if(Meteor.isClient){
Template.componentModal.events({
  'click .save-component'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const componentName = $('#componentName').val();
    const componentType = $('#componentType').val();

    if (Session.get("selectedComponent") == "" || Session.get("selectedComponent") == null){
    Meteor.call('components.insert', {
      componentName: componentName,
      componentType: componentType,
      interfaceOwner: Session.get("selectedInterface"),
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
    });
  }else {
      Meteor.call('components.update',
        {
        _id: Session.get("selectedComponent"),
        componentName: componentName,
        componentType: componentType,
        updatedAt: new Date(), // current time
      }
      );
    }


    // Clear form
    $('#componentName').val('');
    $('#componentType').val('');
    Session.set("selectedComponent", "");

  },
  'click .delete-component'() {
    event.preventDefault();
    Meteor.call('components.remove', Session.get("selectedComponent"));
    Session.set('selectedComponent', '');

  },
});
}
