import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Interfaces } from '../../api/interfaces.js';

import './interface.js';
import './manageInterfaces.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('interfaces');
});

Template.manageInterfaces.helpers({
  'interfaces': function() {

    return Interfaces.find({owner: Meteor.userId()}, {sort: {interfaceName: 1} });
  },
  'selectedInterface': function() {
    if (Session.get("selectedInterface") != ''){
    return Interfaces.findOne({owner: Meteor.userId(), _id: Session.get("selectedInterface") });
  }else{
    return null;
  }
  },

});

Template.manageInterfaces.events({
  'submit .save-interface'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const interfaceName = target.interfaceName.value;
    const flowIdentifier = target.flowIdentifier.value;
    const email = target.email.checked;
    const facebook = target.facebook.checked;
    const sms = target.sms.checked;

    if (Session.get("selectedInterface") == "" || Session.get("selectedInterface") == null){
    Meteor.call('interfaces.insert', {
      interfaceName: interfaceName,
      flowIdentifier: flowIdentifier,
      email: email,
      facebook: facebook,
      sms: sms,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
    });
  }else {
      Meteor.call('interfaces.update',
        {_id: Session.get("selectedInterface"),
        interfaceName: interfaceName,
        flowIdentifier: flowIdentifier,
        email: email,
        facebook: facebook,
        sms: sms,
        updatedAt: new Date(), // current time
      }
      );
    }


    // Clear form
    target.interfaceName.value = '';
    target.flowIdentifier.value = '';
    target.email.checked = false;
    target.facebook.checked = false;
    target.sms.checked = false;
    Session.set("selectedInterface", "");

  },
});
