module.exports = function(app, passport, db, socket, io) {


      // show the Home Page
  app.get('/', function(req, res) {
       res.render('index.ejs');
  });

      //get homepage when user login ---> gets temp and hum
  app.get('/profile', isLoggedIn, function(req, res) {
  
    db.collection('device_temp').find().toArray((err, result) => {
      if (err) return console.log(err)

      io.sockets.on ('connection', newConnection)
      
      function newConnection(socket){
        
        console.log('new connection'+ socket.id)
      
        socket.on('dht', msg)

        function msg(data){
        
        res.render('profile.ejs', { //currently index.html
          //user: req.user,
          data: result,
          dht: data
       })
      }
    }


      
      //<socket.io> ---> live temp/hum data stream ????????
      // res.render('profile.ejs', { //currently index.html
      //   //user: req.user,
      //   data: result
      // })
     
    })
  });

      //get device manager page
  app.get('/devices', isLoggedIn, function(req, res) {
    db.collection('device_temp').find().toArray((err, result) => {
      if (err) return console.log(err)
      
      //<socket.io> ---> live temp/hum data stream ????????
      res.render('devices.ejs', { //currently index.html
        //user: req.user,
        data: result
      })
     
  })
  })

  //add new device id and device_name from form
  app.post('/devices', (req, res) => {   
    db.collection('device_temp').save({usr:req.user.local.email, device_id:req.body.device_id, device_name:req.body.device_name, daily_avg: [], weekly_avg: [] , monthly_avg:[] }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/devices');
    })

  })

  // deletes devices
  app.delete('/devices', (req, res) => {   
    console.log(req.body.device_id)
        db.collection('device_temp').findOneAndDelete({ device_id: req.body.device_id }, (err, result) => {
          if (err) return res.send(500, err)
          console.log('Message deleted!')
          res.redirect('/devices');
        })
   
   })
  //change device name
  app.put('/devices', (req, res) => {  
 
  })

  // show the login form
  app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // show the signup form
  app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));


    // unlink local account 
  app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });


  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.redirect('/');
}
}
