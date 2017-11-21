import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Interfaces } from '../api/interfaces.js';

import './interface.html';

Template.interface.helpers({
  interfaces() {
    return Interfaces.find({}, {sort: {interfaceName: 1} });
  }
});

Template.interface.events({
  'submit .new-interface'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const interfaceName = target.interfaceName.value;
    const fDNumber = target.fDNumber.value;
    const email = target.email.checked;
    const facebook = target.facebook.checked;
    const sms = target.sms.checked;

    // Insert a task into the collection
    Interfaces.insert({
      interfaceName: interfaceName,
      fDNumber: fDNumber,
      email: email,
      facebook: facebook,
      sms: sms,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.interfaceName.value = '';
    target.fDNumber.value = '';
    target.email.checked = false;
    target.facebook.checked = false;
    target.sms.checked = false;
  },
  'click .delete-interface'() {
    Interfaces.remove(this._id);
  },
});
