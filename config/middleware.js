const checkAuth = function(req, res, next){
  if(!req.user) res.redirect('/login')
    else next()
}

const putCookieOnRes = function(req, res, next){
	console.log('putting req.user on the cookie')
	console.log('user', req.user)
	res.cookie('uid_auth', req.user ? req.user._id : null )		
	next()
}

const errorHandler = function(err, req, res, next) {
  res.json(err);
  return
} 


module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  putCookieOnRes: putCookieOnRes
}