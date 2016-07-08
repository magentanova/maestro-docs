const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = {
   connectToDB: function(projectName){
      let dbLocation = 'mongodb://localhost/'+ projectName

      if (process.env.NODE_ENV = "development"){
        dbLocation += "_dev"
        mongoose.connect(dbLocation , (err, db)=>{
          // mongoose.connection.db.dropDatabase();
          console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
        })
      } else {
        dbLocation += "_production"
        mongoose.connect(dbLocation)
      }  
    },

  setupSchema: function(){
    const userSchema = new Schema({
      email: String,
      password: String
    })

    let User = mongoose.model('User', userSchema)
    
    return {
      User: User
    }
  }
}
