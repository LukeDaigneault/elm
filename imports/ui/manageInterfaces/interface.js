import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './interface.html';


Template.interface.helpers({
  'selectedClass': function(){
    const interfaceId = this._id;
    const selectedInterface = Session.get('selectedInterface');
    if(interfaceId == selectedInterface){
      return "success";
      }
    },

});



Template.interface.events({
  'click .interface'() {
    const interfaceId = this._id;
    const selectedInterface = Session.get('selectedInterface');
    if (interfaceId == selectedInterface) {
      Session.set('selectedInterface', '');

    } else {
      Session.set('selectedInterface', interfaceId);
    }
  },
  'click .delete-interface'() {
    if (this._id == Session.get('selectedInterface')) {
      Session.set('selectedInterface', '');
    }

    Meteor.call('interfaces.remove', this._id);
  },
});
