
import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';



if(Meteor.isClient) {

  Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.redirect('Welcome');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
},{
except: ['Welcome']});

  Router.route('/',function(){
    this.redirect('welcome');
  });
  Router.route('Welcome', function(){
    this.render('welcome');
  });
  Router.route('/ManageInterfaces',function(){
      this.render('manageInterfaces');
  });
    Router.route('/Dashboard',function(){
        this.render('dashboard');
    });
}

Template.registerHelper('currentRouteIs', function (route) {
  return Router.current().route.getName() === route;
});
