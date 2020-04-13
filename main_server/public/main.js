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

      //   if (count%2 === 0){
  
      //     var paidOn = true
      //     count++
  
      //   }else {
      //     var paidOn = false
      //     count++
      //   }
      //   fetch('/list', {
      //     method: 'put',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({
      //       'company': company,
      //       'date': date,
      //       'amt': amt,
      //       'paid':paidOn
      //     })
      //   })
      //   .then(response => {
      //     if (response.ok) return response.json()
      //   })
      //   .then(data => {
      //     console.log(data)

      //    if(data.value.paid){

      //     element.style.backgroundColor ="green"

      //    }else{
      //     element.style.backgroundColor ="transparent"

      //    }
      //     //window.location.reload(true)
      //   })
      // });
});



