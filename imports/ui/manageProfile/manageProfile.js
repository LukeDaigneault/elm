import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles.js';


import './manageProfile.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('profiles');
});

Template.manageProfile.helpers({
  profile() {
    return Profiles.findOne({owner: Meteor.userId()});
  }
});

Template.manageProfile.events({
  'submit .add-profile'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const fBookId = target.fBookId.value;
    const email = target.email.value;
    const phoneNumber = target.phoneNumber.value;
    const username = target.username.value;

    // Insert a profile into the collection
     Meteor.call('profiles.upsert', Meteor.userId(), username, {
      firstName: firstName,
      lastName: lastName,
      fBookId: fBookId,
      email: email,
      phoneNumber: phoneNumber,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
    });

    Router.go('/Dashboard');

  },
  'reset .add-profile'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    Router.go('/Dashboard');

  },
});
