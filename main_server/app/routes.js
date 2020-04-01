module.exports = function(app, passport, db) {


      // show the Home Page
  app.get('/', function(req, res) {
      res.render('index.ejs');
      });
      //get homepage when user login ---> gets temp and humidity
  app.get('/homepage', isLoggedIn, function(req, res) {
    if(req.user.local.email){
      db.collection('device_temp').find().toArray((err, result) => {
        if (err) return console.log(err)
        
        //<socket.io> ---> live temp/hum data stream ????????
        
        
      /*  res.render('home.ejs', { //currently index.html
          user: req.user,
          data: result
        })*/
      })
    }
  });

      //get device manager page
  app.get('/devices', isLoggedIn, function(req, res) {
  if(req.user.local.email){
      db.collection('device_temp').find().toArray((err, result) => {
      if (err) return console.log(err)

    //<socket.io> live device status 
      
    /*  res.render('home.ejs', { //currently index.html
            user: req.user,
            data: result
          })*/
      })
  }
  });

  //add new device id and device_name from form
  app.post('/devices', (req, res) => {   
    if(req.user.local.email){
    db.collection('device_temp').save({device_id:req.body.device_id, device_name:req.body.device_name }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
    })
  }
  })

  // deletes devices
  app.delete('/devices', (req, res) => {
      
    if(req.user.local.email){
        db.collection('device_temp').findOneAndDelete({ device_id:req.body.device_id }, (err, result) => {
          if (err) return res.send(500, err)
          res.send('Message deleted!')
        })
        }
      })
  //change device name
  app.put('/devices', (req, res) => {  
    if(req.user.local.email){
    
    // user input checking ---> req.body.name_change
    
  db.collection('device_temp').findOneAndUpdate({device_id:req.body.device_id }, (err, result) => {
      $set{
      device_name: req.body.name_change     
          
      }
    if (err) return console.log(err)
    console.log('saved to database')
  })
  }
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

  };

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.redirect('/');
}
