import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './manageProfile.html';


Template.manageProfile.events({
  'submit .update-user'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const firstName = target.firstName.value;

    Meteor.users.update(Meteor.userId(), {
      $set: {
        firstName: firstName,
    }
  });
  },
});
