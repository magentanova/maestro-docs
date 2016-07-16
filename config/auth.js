const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


module.exports = function(UserModel){
  let authFields = {
      usernameField: 'email',
      passwordField: 'password'
  }

  let onLogin = function(inputUser, inputPW, done){
      UserModel.findOne({"email": inputUser}, function(err, results){
        console.log('running onlogin')
        if(err || !results){  
          //will trigger failure callback
          done(null , false, {message: "user no exist"})   
        } else if(results.password !== inputPW) {
          //will trigger failure callback
          done(null, false, {message: "Bad Password"} )      
        } else {
          done(null, results); 
          //calls req.login(results)
        }
    })

  }

  passport.serializeUser( function(user, done){
    done(null, user.id);
  } )

  passport.deserializeUser( function(userId, done){
    UserModel.findById(userId, "-password", function(err, record){
      done(null, record)
    })
  })


  passport.use( new LocalStrategy(authFields, onLogin) ) 
}

