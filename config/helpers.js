const sanitizeUser = function(userRecord){
    let userNoPW = {}
    
    for (var prop in (userRecord._doc || userRecord)) {
      if (prop !== 'password') userNoPW[prop] = userRecord._doc[prop]
    }

    return userNoPW
}

const updateFields = function(record, resBody){
  if (resBody.password) delete req.body.password

  for (var prop in resBody) {
    record[prop] = resBody[prop]
  }
  return record
}


module.exports = {
  sanitizeUser: sanitizeUser,
  updateFields: updateFields
}