const mongoose = require('mongoose');
const createModel = mongoose.model;
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,

    //Add yours here 
})

const postsSchema = new Schema({
  title: String, 
  body: String,
  user: Object
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Post: mongoose.model('Post', postsSchema)
}
