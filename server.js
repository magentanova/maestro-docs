const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const {renderFile} = require('ejs')

const appKeys = require('./config/secrets.js')
const appAuthentication = require('./config/auth.js')
const connectToDB = require('./config/db-setup.js').connectToDB
let { User, Post } = require('./db/schema.js')

const app = express()

const PORT = process.env.PORT || 3000



const checkAuth = function(req, res, next){
  if(!req.user) res.redirect('/login')
    else next()
}


// got env port for heroku or elsewhere, else set to 3000 for dev
app.set('port', PORT)

app.set('views', './dist/views');
app.engine('html', renderFile)
app.set('view engine', 'html');


// =========
// DATABASE
// =========
connectToDB("tiy-starter-kit")



// =========
// MIDDLEWARE
// =========
// serving images from dist/assets/

app.use( express.static( __dirname + '/dist/assets') );
// bodyParser mw to parse incoming POST/PUT/PATCH requests as JSON
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );
app.use( session({secret: appKeys.sessionSecret }) );
app.use( passport.initialize() );
app.use( passport.session() );
appAuthentication(User)


// Passport Config



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
    newUser.save(function(err){
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

app.get('/api/posts', function(req, res){
  Post.find({}, function(err, results){
    res.json(results)
  })
})
app.post('/api/posts', function(req, res){
  let newPost = new Post(req.body)
  newPost.save(function(err){
    if(err) return res.json({message: 'error saving'})
      res.json(newPost)
  })
})

app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})