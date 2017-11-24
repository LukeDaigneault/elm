import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './interface.html';

Template.interface.events({
  'click .delete-interface'() {
    Meteor.call('interfaces.remove', this._id);
  },
});
