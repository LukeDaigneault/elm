import { Template } from 'meteor/templating';
import { Chart } from 'chart.js/src/chart.js';
import { Alerts } from '../../api/alerts.js';
//import { Components} from '../../api/components.js'; 
import './dashboardChart.html';

Template.body.onCreated(function() {

});


Template.dashboardChart.onRendered(function() {
  const alerts = this.subscribe("alerts");

  Tracker.autorun(function() {
    if (alerts.ready()) {
      const datalabels = [];
      const datavalues = [];

      //const components = Components.find({}, {componentName:1,  _id:0});
      //const componentNames = [];

      //components.forEach(function(doc){
      //  componentNames.push(doc.componentName);
      //});

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
          }).count()
        );

        lookupStartDate.setDate(lookupStartDate.getDate() + 1);
        lookupEndDate.setDate(lookupEndDate.getDate() + 1);
      }
      const ctx = document.getElementById("dashboardChart");
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: datalabels,
          datasets: [{
            label: 'Alerts',
            data: datavalues,
            fill: false,
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,1)',
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
    }
  });

});
