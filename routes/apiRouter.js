let Router = require('express').Router;
const apiRouter = Router()

let { User, Post } = require('../db/schema.js')


apiRouter.get('/users', function(req, res){
  User.find({}, function(err, results){
    res.json(results)
  })
})

apiRouter.get('/posts', function(req, res){
  Post.find({}, function(err, results){
    res.json(results)
  })
})

apiRouter.post('/posts', function(req, res){
  let newPost = new Post(req.body)
  newPost.save(function(err){
    if(err) return res.json({message: 'error saving'})
      res.json(newPost)
  })
})

module.exports = apiRouter