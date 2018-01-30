import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './interface.html';

Template.interface.helpers({
  'selectedInterfaceClass': function(){
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
  'dblclick .interface'() {
    const interfaceId = this._id;
    Session.set('selectedInterface', interfaceId);
    Modal.show('componentModal');
  },
});
