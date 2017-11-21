import '../imports/ui/body.js';

if(Meteor.isClient) {
  Router.route('/',function(){
      this.render('body');
  });
  Router.route('/ManageInterfaces',function(){
      this.render('interface', {data: {navinterface: 'active'}});
  });
    Router.route('/Dashboard',function(){
        this.render('dashboard',{data: {navdashboard: 'active'}});
    });
}

Template.registerHelper('currentRouteIs', function (route) {
  return Router.current().route.getName() === route;
});
