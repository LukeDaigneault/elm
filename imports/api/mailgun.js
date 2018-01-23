import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';
import { Profiles } from './profiles.js';

if(Meteor.isServer){
  Meteor.methods({
  'email.send'(alert) {

    //Need to get Interface name working here some how
              this.unblock();
              const emailOwners = Interfaces.find({flowIdentifier: alert.flowIdentifier, email: true}, {owner:1,  _id:0});

              const owners = [];

              emailOwners.forEach(function(doc){
                owners.push(doc.owner);
              });

              const emailAddresses = Profiles.find({owner: {$in: owners}}, {email:1,  _id:0});


              emailAddresses.forEach(function(doc){

              try {
                    Email.send({
                      to: doc.email,
                      from: "postmaster@sandbox60d6dfd3ac9f44f28305a177bf6da2a4.mailgun.org",
                      subject: "Error occured with " + alert.flowIdentifier,
                      text:'An error has occured with Interface ' + alert.flowIdentifier +  ' transaction ID: ' + alert.transactionId,
                      });

              } catch (err) {
                throw new Meteor.error(err);
              }
              });
        }

  });
}
