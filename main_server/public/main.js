  // var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.querySelectorAll(".trashBtn")
var paid = document.querySelectorAll(".paidBtn")
var count = 0 

Array.from(paid).forEach(function(element) {
      element.addEventListener('click', function(){
        const company = this.parentNode.childNodes[1].innerText
        const date = this.parentNode.childNodes[2].innerText
        const amt = this.parentNode.childNodes[3].innerText
        console.log(count)

        if (count%2 === 0){
  
          var paidOn = true
          count++
  
        }else {
          var paidOn = false
          count++
        }
        fetch('/list', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'company': company,
            'date': date,
            'amt': amt,
            'paid':paidOn
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)

         if(data.value.paid){

          element.style.backgroundColor ="green"

         }else{
          element.style.backgroundColor ="transparent"

         }
          //window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const company = this.parentNode.childNodes[1].innerText
        const date = this.parentNode.childNodes[2].innerText
        const amt = this.parentNode.childNodes[3].innerText
        fetch('/list', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'company': company,
            'date': date,
            'amt': amt
          })
        }).then(function (response) {
          window.location.reload()
          //response.a
        })
      });
});
