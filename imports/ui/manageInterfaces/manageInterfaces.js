import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Interfaces } from '../../api/interfaces.js';

import './interface.js';
import './manageInterfaces.html';

Template.manageInterfaces.helpers({
  interfaces() {
    return Interfaces.find({}, {sort: {interfaceName: 1} });
  }
});

Template.manageInterfaces.events({
  'submit .add-interface'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const interfaceName = target.interfaceName.value;
    const fID = target.fID.value;
    const email = target.email.checked;
    const facebook = target.facebook.checked;
    const sms = target.sms.checked;

    // Insert a task into the collection
    Interfaces.insert({
      interfaceName: interfaceName,
      fID: fID,
      email: email,
      facebook: facebook,
      sms: sms,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.interfaceName.value = '';
    target.fID.value = '';
    target.email.checked = false;
    target.facebook.checked = false;
    target.sms.checked = false;
  },
});
