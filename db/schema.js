const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// POSTS
// ----------------------
const postsSchema = new Schema({
  title:    { type: String, required: true },
  subtitle: { type: String },
  body:     { type: String, required: [true, "No body-content, pls add"] },
  user:     {
              email: { required: [true, "No user email supplied"] }
              _id:   { type: Number, required: true }
            }
})

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:    { type: String, required: true },
  password: { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
  name:     { type: String } // example of optional field

})

module.exports = {
  User: createModel('User', usersSchema),
  Post: createModel('Post', postsSchema)
}
