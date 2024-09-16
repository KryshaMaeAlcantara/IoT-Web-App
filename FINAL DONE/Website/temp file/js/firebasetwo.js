import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, set, ref, get, child, update} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDG_NeXS3omKKF5bIMT9ebLkZsVb86drCw",
  authDomain: "electrocoagulation-system.firebaseapp.com",
  databaseURL: "https://electrocoagulation-system-default-rtdb.firebaseio.com",
  projectId: "electrocoagulation-system",
  storageBucket: "electrocoagulation-system.appspot.com",
  messagingSenderId: "906878973597",
  appId: "1:906878973597:web:c410e43d2160e3ea4fc674",
  measurementId: "G-D7K8L0ZFKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


 // Fetch data from Firebase RTDB
 const mainSupplyRef = ref(db, '/mainSupply/3');

export function updateChartData(interval) {
     let start, end;
     
 
     // Determine the start and end dates based on the selected interval
     switch (interval) {
         case 'day':
             start = new Date();
             start.setHours(0, 0, 0, 0); // Set start of day
             end = new Date();
             end.setHours(23, 59, 59, 999); // Set end of day
             break;
         case 'week':
             start = new Date();
             start.setDate(start.getDate() - start.getDay()); // Set start of week (Sunday)
             start.setHours(0, 0, 0, 0);
             end = new Date(start);
             end.setDate(end.getDate() + 6); // Set end of week (Saturday)
             end.setHours(23, 59, 59, 999);
             break;
         case 'month':
             start = new Date();
             start.setDate(1); // Set start of month
             start.setHours(0, 0, 0, 0);
             end = new Date(start);
             end.setMonth(end.getMonth() + 1);
             end.setDate(0); // Set end of month
             end.setHours(23, 59, 59, 999);
             break;
         case 'sixMonths':
             start = new Date();
             start.setMonth(start.getMonth() - 6); // Set start 6 months ago
             start.setDate(1);
             start.setHours(0, 0, 0, 0);
             end = new Date();
             end.setHours(23, 59, 59, 999); // Set end of today
             break;
         case 'year':
             start = new Date();
             start.setMonth(0, 1); // Set start of year
             start.setHours(0, 0, 0, 0);
             end = new Date();
             end.setMonth(11, 31); // Set end of year
             end.setHours(23, 59, 59, 999);
             break;
     }
 
     // Execute the corresponding query and update the chart and table
     let query;
     switch (interval) {
         case 'day':
             query = queryForDay;
             break;
         case 'week':
             query = queryForWeek;
             break;
         case 'month':
             query = queryForMonth;
             break;
         case 'sixMonths':
             query = queryForSixMonths;
             break;
         case 'year':
             query = queryForYear;
             break;
     }
 
     // Fetch data based on the query
     get(query).then((snapshot) => {
         if (snapshot.exists()) {
             const data = snapshot.val();
             const labels = [];
             const afterTurbidityLevels = [];
             const beforeTurbidityLevels = [];
 
             // Clear previous data
             document.getElementById('dataTable').innerHTML = '';
             
             // Populate table and chart data
             Object.values(data).forEach(entry => {
                 Object.entries(entry).forEach(([timestamp, values]) => {
                     // Convert timestamp to Date object
                     const date = new Date(timestamp.replace(',', '')); // Remove comma from timestamp
                     labels.push(date);
                     afterTurbidityLevels.push(values.afterTurbidityLevel);
                     beforeTurbidityLevels.push(values.beforeTurbidityLevel);
 
                     // Add data to table
                     const tableRow = document.createElement('tr');
                     tableRow.innerHTML = `
                         <td>${values.run}</td>
                         <td>${values.cycle}</td>
                         <td>${values.voltage}</td>
                         <td>${values.treatmentTime}</td>
                         <td>
                             <div class="progress-bar">
                                 <span class="html">${values.beforeTurbidityLevel} NTU</span>
                             </div>
                         </td>
                         <td>
                             <div class="progress-bar">
                                 <span class="css">${values.afterTurbidityLevel} NTU</span>
                             </div>
                         </td> 
                     `;
                     document.getElementById('dataTable').appendChild(tableRow);
                 });
             });
 
             // Update chart data
             const ctx = document.getElementById('myChart').getContext('2d');
             const myChart = new Chart(ctx, {
                 type: 'line',
                 data: {
                     labels: labels,
                     datasets: [{
                         label: 'FINAL',
                         data: afterTurbidityLevels,
                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
                         borderColor: 'rgba(54, 162, 235, 1)',
                         borderWidth: 1
                     }, {
                         label: 'INITIAL',
                         data: beforeTurbidityLevels,
                         backgroundColor: 'rgba(81, 57, 24, 0.2)',
                         borderColor: ' rgba(81, 57, 24, 1)',
                         borderWidth: 1
                     }]
                 },
                 options: {
                     scales: {
                         x: {
                             type: 'time',
                             time: {
                                 parser: 'MM/DD/YYYY, HH:mm:ss', // Adjust the parser according to the date format from Firebase
                                 tooltipFormat: 'll HH:mm:ss',
                                 unit: 'hour',
                                 displayFormats: {
                                     day: 'HH' // Display only the hour part
                                 }
                             },
                             ticks: {
                                 autoSkip: true,
                                 maxTicksLimit: 7, // Limit the maximum number of ticks displayed on the x-axis
                                 maxRotation: 0, // Rotate the labels
                                 minRotation: 0
                             },
                             unitStepSize: 2 // Show labels once every two hours
                         },
                         y: {
                             beginAtZero: true
                         }
                     }
                 }
             });
         } else {
             console.log('No data available');
         }
     }).catch((error) => {
         console.error('Error fetching data:', error);
     });
     
     
 }