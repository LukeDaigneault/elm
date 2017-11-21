import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Interfaces } from '../api/interfaces.js';

import './interface.html';

Template.interface.events({
  'click .delete-interface'() {
    Interfaces.remove(this._id);
  },
});
