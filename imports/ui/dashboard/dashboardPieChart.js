import { Template } from 'meteor/templating';
import { Chart } from 'chart.js/src/chart.js';
import { Alerts } from '../../api/alerts.js';
//import { Components} from '../../api/components.js';
import './dashboardPieChart.html';

function buildDataSeries(datalabels, datavalues, labelcolors) {
  console.log('inside buildDataSeries');

  var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const componentNames = _.uniq(Alerts.find({}, {
    sort: { componentName: 1 },
    fields: { componentName: true }
  }).fetch().map(function(x) {
    return x.componentName;
  }), true);


  for (var i in componentNames) {
    datalabels.push(componentNames[i]);
    labelcolors.push(dynamicColors());
    datavalues.push(
      Alerts.find({
        componentName: datalabels[i],
      }).fetch().length
    );

  }

}

Template.dashboardPieChart.onRendered(function chartOnRendered() {
  console.log('inside onRendered');
  this.datalabels = [];
  this.datavalues = [];
  this.labelcolors = [];

  const ctx = document.getElementById("dashboardPieChart");
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: this.datavalues,
        backgroundColor: this.labelcolors,
      }],
      labels: this.datalabels,
    },
    options: {
      responsive: true,
    }
  });




  this.subscribe('alerts', () => { // removes the need for an onReady() test
    // code to populate this.data array (find().fetch()) and render initial chart
    console.log('inside subscribe');
    buildDataSeries(this.datalabels, this.datavalues, this.labelcolors);

    myChart.update();

    this.autorun(() => {
      // template autoruns will be cleaned up for me
      // code to update this.data (find().fetch()) from the collection and re-draw series (this is a lightweight operation).
      console.log('inside AutoRun');

      const oneMonthOfAlerts = new Date();
      oneMonthOfAlerts.setMonth(oneMonthOfAlerts.getMonth() - 1);
      oneMonthOfAlerts.setHours(0, 0, 0, 0);

      var myCursor = Alerts.find({
        createdAt: {
          $gte: oneMonthOfAlerts,
        },
      }).fetch()


      while (this.datalabels.length > 0) {
        this.datalabels.pop();
      }

      while (this.datavalues.length > 0) {
        this.datavalues.pop();
      }

      while (this.labelcolors.length > 0) {
        this.labelcolors.pop();
      }

      buildDataSeries(this.datalabels, this.datavalues, this.labelcolors);

      myChart.update();
    });
  });

});


//const components = Components.find({}, {componentName:1,  _id:0});
//const componentNames = [];

//components.forEach(function(doc){
//  componentNames.push(doc.componentName);
//});
