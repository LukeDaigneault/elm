import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';
import { Profiles } from './profiles.js';

var accountSid = 'AC8fafae578b7e30c753881ca2e673bd20'; // Your Account SID from www.twilio.com/console
var authToken = '81251d24e6c382daf1609b5816071ffe';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


Meteor.methods({
'sms.send'(alert) {

            const smsOwners = Interfaces.find({flowIdentifier: alert.flowIdentifier, sms: true}, {owner:1,  _id:0});

            const owners = [];

            smsOwners.forEach(function(doc){
              owners.push(doc.owner);
            });

            const smsNumbers = Profiles.find({owner: {$in: owners}}, {phoneNumber:1,  _id:0});


            smsNumbers.forEach(function(doc){
            doc.phoneNumber

            try {
               client.messages.create({
               body: 'An error has occured with Interface ' + alert.flowIdentifier +  ' transaction ID: ' + alert.transactionId,
                to: doc.phoneNumber,  // Text this number
                from: '+33756798817' // From a valid Twilio number
              });
            } catch (err) {
              throw new Meteor.error(err);
            }
            });


      }

});
