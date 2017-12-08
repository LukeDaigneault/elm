import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';

var accountSid = 'AC8fafae578b7e30c753881ca2e673bd20'; // Your Account SID from www.twilio.com/console
var authToken = '81251d24e6c382daf1609b5816071ffe';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


Meteor.methods({
'sms.send'(alert) {
    try {
            const interfaces = Interfaces.find({flowIdentifier: alert.flowIdentifier}, {owner:1,  _id:0});

            client.messages.create({
            body: 'An error has occured with Interface ' + alert.flowIdentifier +  ' transaction ID: ' + transID,
            to: '+33641921342',  // Text this number
            from: '+33756798817' // From a valid Twilio number
          });
        } catch (err) {
        //  throw new Meteor.error(err);
        }
      }

});
