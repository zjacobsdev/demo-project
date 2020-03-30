var sensor = require("node-dht-sensor");
 
setInterval(getTemp,1000)

function getTemp(){
sensor.read(11, 4, function(err, temperature, humidity) {
  if (!err) {
	  
console.log(`temp: ${temperature}°C, humidity: ${humidity}%`)
    
  }
});
}
