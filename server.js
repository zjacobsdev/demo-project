var sensor = require('node-dht-sensor');
//<socket.io> Client
 
setInterval(getTemp,500)

function getTemp(){
sensor.read(11, 4, function(err, temperature, humidity) {
  if (!err) {
	  
console.log(`temp: ${temperature}°C, humidity: ${humidity}%`)
    
  }else{
	  
  console.log('Error: can not get data') 
}
});
}
/*
 <socket.io> //sends live temp data to server
 *  
	 -->endpt= "http:somewebsitedomain.com/device_connect"

*/





