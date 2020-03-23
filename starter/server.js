//Plant Vital Starter API - *evenually routes.js

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


var db, collection;

const url = "  ";
const dbName = " ";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// Every 10 secs the home page refreshes or have real time date 

//get homepage when user login ---> gets temp and humidity
app.get('/homepage', isLoggedIn, function(req, res) {
    if(req.user.local.email){
      db.collection('currTemp').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('home.ejs', { //currently index.html
          user: req.user,
          curData: result
        })
      })
    }
  });


//get device manager page
app.get('/homepage', isLoggedIn, function(req, res) {
if(req.user.local.email){
    db.collection('currTemp').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('device.ejs', {
        user: req.user,
        curData: result
    })
    })
}
});


//add new device id from form
app.post('/devices', (req, res) => {  
  db.collection('currTemp').save({                                         }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// deletes devices
app.delete('/devices', (req, res) => {
    db.collection('currTemp').findOneAndDelete({                         }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })






/////////////////////Log In/ User Authetication//////////////////////////////

// get login page
app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') }); //currently login.html
});

//logot
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', 
    failureRedirect : '/login', 
    failureFlash : true 
}));



