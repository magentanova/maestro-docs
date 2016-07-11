const mongoose = require('mongoose')

module.exports = {
   connectToDB: function(projectName){
      console.log('running db-setup')

      if (process.env.NODE_ENV = "development"){
        let dbLocation = 'mongodb://localhost/'+ projectName
        dbLocation += "_dev"
        mongoose.connect(dbLocation , (err, db)=>{
          // mongoose.connection.db.dropDatabase();
          console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
        })
      } else {
        dbLocation += "_production"
        mongoose.connect(dbLocation)
      }  
      console.log('finished setup')
    }
}
