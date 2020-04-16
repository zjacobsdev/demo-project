var socket = io.connect('http://192.168.1.153:8180');

var ctx = document.getElementById('myChart').getContext('2d');

var trash = document.querySelectorAll("#trash-btn")

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const device_id = this.parentNode.childNodes[3].innerText
        console.log(device_id)
        fetch('/devices', {
              method: 'delete',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                
                device_id: device_id
              })
            })
      })

    
});

socket.on('connect', function(){
  console.log("Client connected")
  console.log(socket)
});

// Recieve Temperature and Humidity.
socket.on('dhtpage', function (data) {

  //console.log("Rendering data : ", data);

  var temp = document.querySelector("#temp");
  var hum = document.querySelector("#hum");

  

  temp.textContent= data.temp + '°F'
  hum.textContent = data.hum + '%'
     

  })



 var tempAvg = document.querySelector('.hide').childNodes
//// Daily Avg Chart.
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Daily Temperature Readings',
            data: [tempAvg[1].textContent, tempAvg[3].textContent, tempAvg[5].textContent, tempAvg[7].textContent, tempAvg[9].textContent, tempAvg[11].textContent, tempAvg[13].textContent], //// add db data here
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
