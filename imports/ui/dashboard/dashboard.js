import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Alerts } from '../../api/alerts.js';


import './dashboard.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('alerts');
});

Template.dashboard.helpers({
  alert_count_today() {
    const start = new Date();
    start.setHours(0,0,0,0);

    return Alerts.find({
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_week() {
    const start = new Date();
    start.setDate(start.getDate()-7);
    start.setHours(0,0,0,0);

    return Alerts.find({
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_month() {
    const start = new Date();
    start.setMonth(start.getMonth()-1);
    start.setHours(0,0,0,0);

    return Alerts.find({
      createdAt: {
        $gte: start,
      }
    }).count();
  },

});
