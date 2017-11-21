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
    const email = target.email.value;
    const facebook = target.facebook.value;
    const sms = target.sms.value;

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
    target.email.value = '';
    target.facebook.value = '';
    target.sms.value = '';
  },
  'click .delete-interface'() {
    Interfaces.remove(this._id);
  },
});
