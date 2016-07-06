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
  console.log('connecting to mongodb://localhost/' + project.name + '_dev')
  mongoose.connect('mongodb://localhost/'+ project.name + '_dev')
} else {
  mongoose.connect('mongodb://localhost/'+ project.name + '_production')
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
  console.log('so seriallll', user)
  done(null, user);
})

passport.deserializeUser( function(user, done){
  console.log('okkkkaaay', user)
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

  done(null, user);

}))


// get and render the root page
app.get('/', function (req, res) {
  res.render('index');
});

//get and render the register page
app.get('/register', function (req, res) {
  res.render('register');
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
      console.log('user saved....')
      req.login(req.body, function(){
        res.redirect('/api/users')   
      })
    })
  })

  
  

})

app.get('/api/users', function(req, res){
  User.find({}, function(err, results){
    res.json(results)
  })
})

app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})