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
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {flowIdentifier:1,  _id:0});
    const flowIdentifiers = [];

    interfaces.forEach(function(doc){
      flowIdentifiers.push(doc.flowIdentifier);
    });

    return Alerts.find({flowIdentifier: {$in: flowIdentifiers}}, {sort: {createdAt: -1}, limit: 30});
  },

  alert_count_hour() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {flowIdentifier:1,  _id:0});
    const flowIdentifiers = [];

    interfaces.forEach(function(doc){
      flowIdentifiers.push(doc.flowIdentifier);
    });

    const start = new Date();
    start.setHours(start.getHours()-1);

    return Alerts.find({
      flowIdentifier: {
        $in: flowIdentifiers
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_today() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {flowIdentifier:1,  _id:0});
    const flowIdentifiers = [];

    interfaces.forEach(function(doc){
      flowIdentifiers.push(doc.flowIdentifier);
    });

    const start = new Date();
    start.setDate(start.getDate()-1);

    return Alerts.find({
      flowIdentifier: {
        $in: flowIdentifiers
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_week() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {flowIdentifier:1,  _id:0});
    const flowIdentifiers = [];

    interfaces.forEach(function(doc){
      flowIdentifiers.push(doc.flowIdentifier);
    });

    const start = new Date();
    start.setDate(start.getDate()-7);

    return Alerts.find({
      flowIdentifier: {
        $in: flowIdentifiers
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_month() {
    const interfaces = Interfaces.find({owner: Meteor.userId()}, {flowIdentifier:1,  _id:0});
    const flowIdentifiers = [];

    interfaces.forEach(function(doc){
      flowIdentifiers.push(doc.flowIdentifier);
    });

    const start = new Date();
    start.setMonth(start.getMonth()-1);

    return Alerts.find({
      flowIdentifier: {
        $in: flowIdentifiers
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  interfaceName(flowIdentifier) {
    const interface = Interfaces.findOne({owner: Meteor.userId(), flowIdentifier: flowIdentifier}, {interfaceName:1});

    return interface.interfaceName;
    }

});

Template.dashboard.events({
  'click .errorLookup'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    $('#modalErrorData pre').text(this.errorMessage);
  },
});
