var socket = io.connect('http://192.168.1.153:8180');


var status = document.querySelectorAll(".dot")
console.log(status)

var trash = document.querySelectorAll(".trash-btn")
console.log(trash)

Array.from(trash).forEach(function(element) {
  //console.log(element)
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
            window.location.reload(true)

      })

    
});
// connect to socket io.
socket.on('connect', function(){
  console.log("Client connected")
  //console.log(socket)
});





// Array.from(status).forEach(function(e) {

//     console.log(e)
//     //if (this.parentNode.childNodes[3].innerText)

    

//     })

