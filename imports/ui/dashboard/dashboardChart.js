import { Template } from 'meteor/templating';
import { Chart } from 'chart.js/src/chart.js';
import { Alerts } from '../../api/alerts.js';
//import { Components} from '../../api/components.js';
import './dashboardChart.html';

function buildDataSeries(datalabels, datavalues) {
  console.log('inside buildDataSeries');

  const now = new Date();

  const lookupStartDate = new Date();
  lookupStartDate.setMonth(lookupStartDate.getMonth() - 1);
  lookupStartDate.setHours(0, 0, 0, 0);

  const lookupEndDate = new Date();
  lookupEndDate.setMonth(lookupEndDate.getMonth() - 1);
  lookupEndDate.setHours(24, 0, 0, 0);
  //for (i = 6; i >= 0; i--) {
  while (lookupStartDate < now) {
    datalabels.push(moment(lookupStartDate).format('ddd Do MMM'));
    datavalues.push(
      Alerts.find({
        //        componentName: {
        //        $in: componentNames
        //        },
        createdAt: {
          $gte: lookupStartDate,
          $lte: lookupEndDate,
        },
      }).fetch().length
    );

    lookupStartDate.setDate(lookupStartDate.getDate() + 1);
    lookupEndDate.setDate(lookupEndDate.getDate() + 1);
  }
}

Template.dashboardChart.onRendered(function chartOnRendered() {
  console.log('inside onRendered');
  this.datalabels = [];
  this.datavalues = [];

  const color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255);
  const borderColor = color + ",1)"
  const backgroundColor = color + ",0.3)"

  const ctx = document.getElementById("dashboardChart");
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.datalabels,
      datasets: [{
        label: 'Alerts',
        data: this.datavalues,
        fill: true,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Date'
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of Alerts'
          }
        }]
      }
    }
  });


  this.subscribe('alerts', () => { // removes the need for an onReady() test
    // code to populate this.data array (find().fetch()) and render initial chart
    console.log('inside subscribe');
    buildDataSeries(this.datalabels, this.datavalues);

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


      buildDataSeries(this.datalabels, this.datavalues);

      myChart.update();
    });
  });
});


//const components = Components.find({}, {componentName:1,  _id:0});
//const componentNames = [];

//components.forEach(function(doc){
//  componentNames.push(doc.componentName);
//});
