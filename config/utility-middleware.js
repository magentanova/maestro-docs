const checkAuth = function(req, res, next){
  if(!req.user) res.redirect('/login')
    else next()
}

const errorHandler = function(err, req, res, next) {
  res.json(err);
  return
} 


module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler
}