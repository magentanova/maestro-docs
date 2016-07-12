let Router = require('express').Router;
let passport = require ('passport')
let User = require('../db/schema.js').User


const authRouter = Router()


authRouter
  .post('/register', function(req, res){
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
        req.login(req.body, function(){
          res.json(newUser)   
        })
      })
    })
  })

authRouter
  .get('/login', function (req, res) {
    if (req.user) res.status(200).json(req.user);
      else res.status(403).json({message: "Forbidden: user no longer authenticated"})
  })
  .post('/login', passport.authenticate('local',
    { 
      failureRedirect: '/forbidden'
    }),
    function(req, res){
      res.cookie("userId",req.user._id).redirect('/dashboard')
    }
  )

  authRouter
    .get('/logout', function (req, res) {
      if (req.user) req.logout();
      res.redirect('/')
    })


module.exports = authRouter
