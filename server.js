<<<<<<< HEAD
let bodyParser = require('body-parser');
let express = require('express');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let renderFile = require('ejs').renderFile

let project = require('./package.json')
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let app = express()

let PORT = process.env.PORT || 3000 



if (process.env.NODE_ENV = "development"){
  let dbLoc = 'mongodb://localhost/'+ project.name + '_dev'
  
  mongoose.connect(dbLoc , (err, db)=>{
    // mongoose.connection.db.dropDatabase();
    console.log("\n\n===== Connected to: " + dbLoc +  "=====\n\n")
  })

} else {
  mongoose.connect('mongodb://localhost/'+ project.name + '_production')
}
=======
const bodyParser = require('body-parser')
const express = require('express')
const renderFile = require('ejs').renderFile
const app = express()

const theRoot = __dirname + '/dist/',
	PORT = process.env.PORT || 3000 
>>>>>>> upstream/master

// got env port for heroku or elsewhere, else set to 3000 for dev
app.set('port', PORT)

app.set('views', './dist/views');
app.engine('html', renderFile)
app.set('view engine', 'html');


// =========
// DATABASE
// =========
const userSchema = new Schema({
  email: String,
  password: String
})

let User = mongoose.model('User', userSchema)
// ==========



// =========
// MIDDLEWARE
// =========
// serving images from dist/assets/
app.use( express.static( __dirname + '/dist/assets') );
// bodyParser mw to parse incoming POST/PUT/PATCH requests as JSON
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );

app.use( session({secret: 'library'}) );
app.use( passport.initialize() );
app.use( passport.session() );

// Passport Config
passport.serializeUser( function(user, done){
  console.log('so seriallll', user)
  done(null, user);
})

passport.deserializeUser( function(user, done){
  console.log('so DEseriallll', user)
  done(null, user)
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(usrNm, pw, done){
  
  let user = {
    username: usrNm,
    password: pw
  };

  User.findOne({"email": user.username}, function(err, results){
    if(err){ done('user not found', null) }
    console.log('user FOUND!')
    done(null, results);

  })

}))


// get and render the root page
app.get('/', function (req, res) {
  res.render('index');
});

//get and render the register page
app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/welcome', function (req, res) {
  res.render('welcome');
});

app.get('/forbidden', function (req, res) {
  res.render('forbidden');
});


app.post('/auth/register', function(req, res){
  console.log('WHAAAT???')
  console.log(req.body)
  // passport appends to request

  let newUser = new User(req.body)

  User.find({email: req.body.email}, function(err, results){

    if(results !== null && results.length > 0) { 
      let record = {}
      record.msg = "record already exists" ;      
      record.data = results
      res.json(record)
      return 
    }
    newUser.save( req.body , function(err){
      console.log('user saved....', 'logging in ---> ')
      req.login(req.body, function(){
        res.redirect('/api/users')   
      })
    })
  })
})

app.post('/auth/login', passport.authenticate('local',
  { 
    failureRedirect: '/forbidden'
  }),
  function(req, res){
    console.log('wahhht?')
    res.redirect('/api/users')
  }
)

app.get('/api/users', function(req, res){
  User.find({}, function(err, results){
    res.json(results)
  })
})

app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})