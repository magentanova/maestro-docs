let Router = require('express').Router;
let passport = require ('passport')
let { User } = require('../db/schema.js')


const authRouter = Router()


authRouter
  .post('/register', function(req, res){
    // passport appends to request
    console.log(req.body)
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

    res.json(req.session);
  })
  .post('/login', passport.authenticate('local',
    { 
      failureRedirect: '/forbidden'
    }),
    function(req, res){
      res.redirect('/dashboard')
    }
  )

module.exports = authRouter
