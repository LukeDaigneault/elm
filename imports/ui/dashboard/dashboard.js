import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Alerts } from '../../api/alerts.js';
import { Interfaces } from '../../api/interfaces.js';
import { Components } from '../../api/components.js';


import './dashboard.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('alerts');
});

Template.dashboard.helpers({

  alerts() {
    const components = Components.find({owner: Meteor.userId()}, {componentName:1,  _id:0});
    const componentNames = [];

    components.forEach(function(doc){
      componentNames.push(doc.componentName);
    });

    return Alerts.find({componentName: {$in: componentNames}}, {sort: {createdAt: -1}, limit: 30});
  },

  alert_count_hour() {
    const components = Components.find({owner: Meteor.userId()}, {componentName:1,  _id:0});
    const componentNames = [];

    components.forEach(function(doc){
      componentNames.push(doc.componentName);
    });

    const start = new Date();
    start.setHours(start.getHours()-1);

    return Alerts.find({
      componentName: {
        $in: componentNames
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_today() {
    const components = Components.find({owner: Meteor.userId()}, {componentName:1,  _id:0});
    const componentNames = [];

    components.forEach(function(doc){
      componentNames.push(doc.componentName);
    });

    const start = new Date();
    start.setDate(start.getDate()-1);

    return Alerts.find({
      componentName: {
        $in: componentNames
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_week() {
    const components = Components.find({owner: Meteor.userId()}, {componentName:1,  _id:0});
    const componentNames = [];

    components.forEach(function(doc){
      componentNames.push(doc.componentName);
    });

    const start = new Date();
    start.setDate(start.getDate()-7);

    return Alerts.find({
      componentName: {
        $in: componentNames
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  alert_count_month() {
    const components = Components.find({owner: Meteor.userId()}, {componentName:1,  _id:0});
    const componentNames = [];

    components.forEach(function(doc){
      componentNames.push(doc.componentName);
    });

    const start = new Date();
    start.setMonth(start.getMonth()-1);

    return Alerts.find({
      componentName: {
        $in: componentNames
      },
      createdAt: {
        $gte: start,
      }
    }).count();
  },

  interfaceName(componentName) {
    const component = Components.findOne({owner: Meteor.userId(), componentName: componentName}, {interfaceOwner:1});
    const interface = Interfaces.findOne({owner: Meteor.userId(), _id: component.interfaceOwner}, {interfaceName:1});

    return interface.interfaceName;
  },

  componentType(componentName){
    const component = Components.findOne({owner: Meteor.userId(), componentName: componentName}, {componentType:1});

    return component.componentType;
  }

});

Template.dashboard.events({
  'click .errorLookup'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    $('#modalErrorData pre').text(this.errorMessage);
  },
});
