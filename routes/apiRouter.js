let Router = require('express').Router;
const apiRouter = Router()
let utils = require('../config/utility-actions.js')

let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post


apiRouter
  //fetch many
  .get('/posts/', function(req, res, next){
    Post.find(req.query, function(err, results){
      if(err) return next(err) 
      res.json(results)
    })
  })
  //create one
  .post('/posts', function(req, res, next){
    let newPost = new Post(req.body)
    newPost.save(function(err){
      if(err) return next(err) 
      res.json(newPost)
    })
  })

apiRouter
  //fetch one
  .get('/posts/:_id', function(req, res, next){
    Post.findById(req.params._id, function(err, record){
      if(err || !record) return next(err) 
      res.json(record)
    })
  })
  //edit one
  .put('/posts/:_id', function(req, res, next) {
    Post.findById(req.params._id, function(err,record) {
      let recordWithUpdates = utils.updateFields(record,req.body)
      recordWithUpdates.save(function(err){
        if(err || !record) return next(err) 
        res.json(record)
      })
    })
  })
  //delete one
  .delete('/posts/:_id', (req, res, next) => {
    Post.findOne(req.params, (err, record) => {
      if(err || !record) return next(err)
      record.remove(function(err){
        if(err) return next(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })
    })  
  })

  apiRouter
    .get('/users', function(req, res, next){
      User.find(req.query, function(err, results){
        if(err) return next(err) 
        let sanitizedUsers = results.map(utils.sanitizeUser)
        res.json(sanitizedUsers)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res, next){
      User.findOne(req.params, function(err, record){
        if(err || !results ) return next(err) 
        let sanitizedUser = utils.sanitizeUser(record)
        res.json(sanitizedUser)
      })
    })
    .put('/users/:_id', function(req, res, next){
      User.findOne(req.params, function(err, record){
        if(err || !record) return next(err) 
        let sanitizedUser = utils.sanitizeUser(record)
        let recordWithUpdates = utils.updateFields(sanitizedUser, req.body)
        recordWithUpdates.save(function(err){
          if(err) return next(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res, next){
      User.findOne(req.params, (err, record) => {
        if(err || !record) return next(err)
        record.remove(function(err){
          if(err) return next(err)
          res.json({
            msg: `record ${req.params._id} successfully deleted`,
            _id: req.params._id
          })
        })
        
      })  
    })

module.exports = apiRouter