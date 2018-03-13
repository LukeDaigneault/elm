import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './dashboardModal.html';

Template.body.onCreated(function bodyOnCreated() {
});

Template.dashboardModal.onDestroyed(function () {
  Session.set("selectedError", "");
});

Template.dashboardModal.helpers({
'errorMessage': function() {

  return Session.get("selectedError");
}


});

if(Meteor.isClient){
Template.dashboardModal.events({

});
}
