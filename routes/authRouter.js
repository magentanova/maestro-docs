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
  .get('/checkAuth', function (req, res) {
    if (req.user) res.json({user: req.user});
    else res.json({user: null})
  })
  .post('/login', passport.authenticate('local'),
    function(req, res){
      if (!req.user) {
        res.status(500).json({
          err: 'user doesnt exist'
        })
      }
      else {
        let userCopy = JSON.parse(JSON.stringify(req.user))
        userCopy.password = ''
        res.json(userCopy)        
      }
    }
  )
  .get('/logout', function (req, res) {
    if (req.user) {
      console.log(req.user)
      let email = req.user.email
      req.logout()
      res.json({
        msg: `user ${email} logged out`
      })
    }
    else {
      res.json({
        msg: 'error: no current user'
      })
    }
  })



module.exports = authRouter