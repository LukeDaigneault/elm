import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Interfaces } from '../../api/interfaces.js';

import './interface.js';
import './componentModal.js';
import './manageInterfaces.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('interfaces');
});

Template.manageInterfaces.helpers({
  'interfaces': function() {

    return Interfaces.find({owner: Meteor.userId()}, {sort: {interfaceName: 1} });
  },
  'selectedInterface': function() {
    if (Session.get("selectedInterface") != ''){
    return Interfaces.findOne({owner: Meteor.userId(), _id: Session.get("selectedInterface") });
  }else{
    return null;
  }
  },

});

Template.manageInterfaces.events({
  'submit .save-interface'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const interfaceName = target.interfaceName.value;
    const hourWarn = target.hourWarn.value;
    const dayWarn = target.dayWarn.value;
    const weekWarn = target.weekWarn.value;
    const monthWarn = target.monthWarn.value;
    const email = target.email.checked;
    const facebook = target.facebook.checked;
    const sms = target.sms.checked;

    if (Session.get("selectedInterface") == "" || Session.get("selectedInterface") == null){
    Meteor.call('interfaces.insert', {
      interfaceName: interfaceName,
      hourWarn: hourWarn,
      dayWarn: dayWarn,
      weekWarn: weekWarn,
      monthWarn: monthWarn,
      email: email,
      facebook: facebook,
      sms: sms,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
    });
  }else {
      Meteor.call('interfaces.update',
        {_id: Session.get("selectedInterface"),
        interfaceName: interfaceName,
        hourWarn: hourWarn,
        dayWarn: dayWarn,
        weekWarn: weekWarn,
        monthWarn: monthWarn,
        email: email,
        facebook: facebook,
        sms: sms,
        updatedAt: new Date(), // current time
      }
      );
    }


    // Clear form
    target.interfaceName.value = '';
    target.hourWarn.value = '';
    target.dayWarn.value = '';
    target.weekWarn.value = '';
    target.monthWarn.value = '';
    target.email.checked = false;
    target.facebook.checked = false;
    target.sms.checked = false;
    Session.set("selectedInterface", "");

  },
  'click .delete-interface'() {
    event.preventDefault();
    Meteor.call('interfaces.remove', Session.get('selectedInterface'));
    Session.set('selectedInterface', '');

  },
  'click .view-component'(e) {
    e.preventDefault();

    Modal.show('componentModal');
  },
});
