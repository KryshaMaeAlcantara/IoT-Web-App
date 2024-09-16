// setup 
const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'INITIAL',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: 'rgba(81, 57, 24, 0.2)',
      borderColor: ' rgba(81, 57, 24, 1)',
      borderWidth: 1
    },
    {
      label: 'FINAL',
      data: [10, 14, 8, 11, 9, 5, 13],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  // config 
  const config = {
    type: 'line',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  // Instantly assign Chart.js version
  const chartVersion = document.getElementById('chartVersion');
  chartVersion.innerText = Chart.version;