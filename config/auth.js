const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


module.exports = function(UserModel){
  let authFields = {
      usernameField: 'username',
      passwordField: 'password'
  }

  let onLogin = function(inputUser, inputPW, done){
      UserModel.findOne({"email": inputUser}, function(err, results){
        if(err){  
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
  })

  passport.deserializeUser( function(userId, done){
    UserModel.findById(userId, function(err, record){

      let userForReq = {
        email: record.email,
        _id: record._id
      }

      done(null, userForReq)
    })
  })


  passport.use( new LocalStrategy(authFields, onLogin) ) 
}

