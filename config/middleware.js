const checkAuth = function(req, res, next){
  if(!req.user) {
    res.status(500).send({
      error: 'no user logged in'
    })
  }
  else next()
}

const errorHandler = function(err, req, res, next) {
  console.log(err)
  res.render(err);
  return
} 

const cookifyUser = function(req,res,next) {
  if (req.user) {
    res.cookie(process.env.npm_config_name + '_user',JSON.stringify(req.user))
    res.cookie('tiy_full_stack_app_name',process.env.npm_config_name)
    next()
  }
  else {
    console.log('no user')
    res.cookie(process.env.npm_config_name + '_user','null')
    res.cookie('tiy_full_stack_app_name',process.env.npm_config_name)
    next()
  }
}

module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  cookifyUser: cookifyUser
}