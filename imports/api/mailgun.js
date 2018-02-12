import { Meteor } from 'meteor/meteor';
import { Interfaces } from './interfaces.js';
import { Components } from './components.js';
import { Profiles } from './profiles.js';

if(Meteor.isServer){
  Meteor.methods({
  'email.send'(alert) {

    //Need to get Interface name working here some how
              this.unblock();

              const componentInterfaces = Components.find({componentName: alert.componentName}, {interfaceOwner:1, _id:0});

              componentInterfaces.forEach(function (compDoc) {

                const emailOwners = Interfaces.find({_id: compDoc.interfaceOwner, email: true}, {interfaceName:1, owner:1,  _id:0});

                emailOwners.forEach(function(intDoc){

                  const emailAddresses = Profiles.find({owner: intDoc.owner}, {email:1,  _id:0});


                  emailAddresses.forEach(function(ownerDoc){

                    try {
                          Email.send({
                            to: ownerDoc.email,
                            from: Meteor.settings.emailFromAddress,
                            subject: 'An error has occured with Interface ' + intDoc.interfaceName,
                            text:'An error has occured with Interface "' +
                             intDoc.interfaceName +
                             '" in component "' +
                             alert.componentName +
                             '" , transaction ID: ' +
                             alert.transactionId,
                            });

                    } catch (err) {
                      throw new Meteor.error(err);
                    }
                  });
                });
              });
        }

  });
}
