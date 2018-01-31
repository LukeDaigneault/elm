import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Components } from '../../api/components.js';

import './component.html';

Template.component.helpers({
  'selectedComponentClass': function(){
    const componentId = this._id;
    const selectedComponent = Session.get('selectedComponent');
    if(componentId == selectedComponent){
      return "success";
      }
    },

});

Template.component.events({
  'click .component'() {
    const componentId = this._id;
    const selectedComponent = Session.get('selectedComponent');
    if (componentId == selectedComponent) {
      Session.set('selectedComponent', '');

    } else {
      Session.set('selectedComponent', componentId);
    }
  },
});
