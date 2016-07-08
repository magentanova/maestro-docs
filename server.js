const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const renderFile = require('ejs').renderFile

const project = require('./package.json')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const app = express()

const PORT = process.env.PORT || 3000
let dbLoc = 'mongodb://localhost/'+ project.name

const checkAuth = function(req, res, next){
  if(!req.user) res.redirect('/login')
    else next()
}

if (process.env.NODE_ENV = "development"){
  dbLoc += "_dev"
  mongoose.connect(dbLoc , (err, db)=>{
    // mongoose.connection.db.dropDatabase();
    console.log("\n\n===== Connected to: " + dbLoc +  "=====\n\n")
  })
} else {
  dbLoc += "_production"
  mongoose.connect(dbLoc)
}

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
  console.log('so serialll')
  done(null, user.id);
})

passport.deserializeUser( function(userId, done){
  console.log('so DEseriallll', userId)
  User.findById(userId, function(err, record){

    let userForReq = {
      email: record.email,
      _id: record._id
    }

    done(null, userForReq)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(inputUser, inputPW, done){
  console.log(inputUser)
  User.findOne({"email": inputUser}, function(err, results){
    if(err){ 
      done(null , false, {message: "user no exist"})
      return 
    }
    if(results.password !== inputPW){
      done(null, false, {message: "Bad Password"} )
      return
    }
    done(null, results); 
    //calls req.login(results)
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
  console.log("CURRENT SESSION", req.session)

  res.render('login');
});

app.get('/dashboard', checkAuth, function (req, res) {
  console.log("CURRENT SESSION", req.session)

  console.log("CURRENT USER:", req.user)
  res.render('dashboard');
});

app.get('/forbidden', function (req, res) {
  res.render('forbidden');
});


app.post('/auth/register', function(req, res){
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
    res.redirect('/dashboard')
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