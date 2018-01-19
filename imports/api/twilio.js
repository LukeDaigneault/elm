import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';
import { Profiles } from './profiles.js';
var twilio = require('twilio');

if(Meteor.isServer){
  Meteor.methods({
  'sms.send'(alert) {
              this.unblock();
              const smsOwners = Interfaces.find({flowIdentifier: alert.flowIdentifier, sms: true}, {owner:1,  _id:0});

              const owners = [];

              smsOwners.forEach(function(doc){
                owners.push(doc.owner);
              });

              const smsNumbers = Profiles.find({owner: {$in: owners}}, {phoneNumber:1, twilloAccountID:1, twilloAuthToken:1,  _id:0});


              smsNumbers.forEach(function(doc){

              try {
                    if (doc.twilloAccountID && doc.twilloAuthToken){
                       var client = new twilio(doc.twilloAccountID, doc.twilloAuthToken);
                       client.messages.create({
                       body: 'An error has occured with Interface ' + alert.flowIdentifier +  ' transaction ID: ' + alert.transactionId,
                        to: doc.phoneNumber,  // Text this number
                        from: '+33756798817' // From a valid Twilio number
                      });
                   }
              } catch (err) {
                throw new Meteor.error(err);
              }
              });
        }

  });
}
