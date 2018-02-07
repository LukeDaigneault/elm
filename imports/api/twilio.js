import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';
import { Profiles } from './profiles.js';
var twilio = require('twilio');

if(Meteor.isServer){
  Meteor.methods({
  'sms.send'(alert) {
              this.unblock();

              const twilioAccountId = Meteor.settings.twilioAccountId;
              const twilloAuthtoken = Meteor.settings.twilloAuthtoken;
              const smsOwners = Interfaces.find({flowIdentifier: alert.flowIdentifier, sms: true}, {owner:1,  _id:0});

              const owners = [];

              smsOwners.forEach(function(doc){
                owners.push(doc.owner);
              });

              const smsNumbers = Profiles.find({owner: {$in: owners}}, {phoneNumber:1, _id:0});


              smsNumbers.forEach(function(doc){

              try {
                    if (twilioAccountId && twilloAuthtoken){
                       var client = new twilio(twilioAccountId, twilloAuthtoken);
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
