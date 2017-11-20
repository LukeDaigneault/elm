import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Interfaces } from '../api/interfaces.js';

import './dashboard.html';

Template.dashboard.helpers({
  interfaces() {
    return Interfaces.find({});
  }
});
