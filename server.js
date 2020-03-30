var sensor = require('node-dht-sensor');
 
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
