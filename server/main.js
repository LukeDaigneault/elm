import '../imports/api/interfaces.js';
import '../imports/api/components.js';
import '../imports/api/profiles.js';
import '../imports/api/alerts.js';
import '../imports/api/twilio.js';
import '../imports/api/mailgun.js';

Meteor.startup(function () {
  process.env.MAIL_URL = Meteor.settings.mailgunURL;
});


if (Meteor.isServer) {
  Router.route('/alert', {where: 'server'})
    .post(function() {
      var response;
        if(this.request.body.alert === undefined || this.request.body.alert === null || this.request.body.alert === "") {
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
          Meteor.call('alerts.insert', this.request.body.alert);

            response = {
                "error" : false,
                "message" : "alert stored."
            };
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));

            Meteor.call('sms.send', this.request.body.alert);
            Meteor.call('email.send', this.request.body.alert);


        }


    });
}
