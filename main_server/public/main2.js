var socket = io.connect('http://192.168.1.153:8180');

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
            window.location.reload(true)

      })

    
});

socket.on('connect', function(){
  console.log("Client connected")
  console.log(socket)
});


