const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // REQUIRED FOR AUTHENTICATION: Do Not Touch
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  // .........................................
  
})

// ----------------------
// POSTS
// ----------------------
const postsSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  subtitle: {
    type: String
  },

  body: {
    type: String,
    required: [true, "No body-content, pls add"]
  },

  user: {
    type: Object,
    required: [true, "No user supplied"]
  }
})

module.exports = {
  User: createModel('User', usersSchema),
  Post: createModel('Post', postsSchema)
}
