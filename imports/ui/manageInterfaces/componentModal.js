import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './componentModal.html';

if(Meteor.isClient){
Template.componentModal.events({
  'click .save'(e) {
    e.preventDefault();

    Modal.hide('componentModal');
  },
});
}
