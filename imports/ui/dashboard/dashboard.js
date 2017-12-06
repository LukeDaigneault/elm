import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Alerts } from '../../api/alerts.js';
import { Interfaces } from '../../api/interfaces.js';


import './dashboard.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('alerts');
});

Template.dashboard.helpers({

  alerts() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {fID:1,  _id:0});
    const fIDs = [];

    interfaces.forEach(function(doc){
      fIDs.push(doc.fID);
    });

    return Alerts.find({flowIdentifier: {$in: fIDs}}, {sort: {createdAt: -1}, limit: 30});
  },

  alert_count_today() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {fID:1,  _id:0});
    const fIDs = [];

    interfaces.forEach(function(doc){
      fIDs.push(doc.fID);
    });

    const start = new Date();
    start.setHours(0,0,0,0);

    return Alerts.find({
      flowIdentifier: {
        $in: fIDs
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_week() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {fID:1,  _id:0});
    const fIDs = [];

    interfaces.forEach(function(doc){
      fIDs.push(doc.fID);
    });

    const start = new Date();
    start.setDate(start.getDate()-7);
    start.setHours(0,0,0,0);

    return Alerts.find({
      flowIdentifier: {
        $in: fIDs
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_month() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {fID:1,  _id:0});
    const fIDs = [];

    interfaces.forEach(function(doc){
      fIDs.push(doc.fID);
    });

    const start = new Date();
    start.setMonth(start.getMonth()-1);
    start.setHours(0,0,0,0);

    return Alerts.find({
      flowIdentifier: {
        $in: fIDs
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

});
