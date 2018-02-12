import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';
import { Components } from './components.js';
import { Profiles } from './profiles.js';
var twilio = require('twilio');

if(Meteor.isServer){
  Meteor.methods({
  'sms.send'(alert) {
              this.unblock();

              const twilioAccountId = Meteor.settings.twilioAccountId;
              const twilloAuthtoken = Meteor.settings.twilloAuthtoken;
              const componentInterfaces = Components.find({componentName: alert.componentName}, {interfaceOwner:1, _id:0});

              componentInterfaces.forEach(function (compDoc) {

                const smsOwners = Interfaces.find({_id: compDoc.interfaceOwner, sms: true}, {interfaceName:1, owner:1,  _id:0});

                smsOwners.forEach(function(intDoc){

                  const smsNumbers = Profiles.find({owner: intDoc.owner}, {phoneNumber:1, _id:0});

                  smsNumbers.forEach(function(ownerDoc){

                    try {
                          if (twilioAccountId && twilloAuthtoken){
                             var client = new twilio(twilioAccountId, twilloAuthtoken);
                             client.messages.create({
                             body: 'An error has occured with Interface "' +
                              intDoc.interfaceName +
                              '" in component "' +
                              alert.componentName +
                              '", transaction ID: ' +
                              alert.transactionId,
                             to: ownerDoc.phoneNumber,  // Text this number
                             from: '+33756798817' // From a valid Twilio number
                            });
                         }
                    } catch (err) {
                      throw new Meteor.error(err);
                    }
                  });
                });
              });
        }

  });
}
