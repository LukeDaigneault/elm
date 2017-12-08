import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Interfaces } from '../../api/interfaces.js';

import './interface.js';
import './manageInterfaces.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('interfaces');
});

Template.manageInterfaces.helpers({
  interfaces() {

    return Interfaces.find({owner: Meteor.userId()}, {sort: {interfaceName: 1} });
      }
});

Template.manageInterfaces.events({
  'submit .add-interface'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const interfaceName = target.interfaceName.value;
    const flowIdentifier = target.flowIdentifier.value;
    const email = target.email.checked;
    const facebook = target.facebook.checked;
    const sms = target.sms.checked;

    Meteor.call('interfaces.insert', {
      interfaceName: interfaceName,
      flowIdentifier: flowIdentifier,
      email: email,
      facebook: facebook,
      sms: sms,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
    });

    // Clear form
    target.interfaceName.value = '';
    target.flowIdentifier.value = '';
    target.email.checked = false;
    target.facebook.checked = false;
    target.sms.checked = false;
  },
});
