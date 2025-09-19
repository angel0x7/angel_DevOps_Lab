const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    
    if (!user.username) {
      return callback(new Error("Wrong user parameters"), null)
    }

    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    db.exists(user.username, (err, reply) => {
      if (err) return callback(err, null)

      if (reply === 1) {
   
        return callback(new Error("User already exists"), null)
      }

 
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) 
      })
    })
  },

  get: (username, callback) => {
  
    db.hgetall(username, (err, obj) => {
      if (err) return callback(err, null)

      if (!obj) {
     
        return callback(new Error("User not found"), null)
      }
      obj.username = username
      callback(null, obj)
    })
  }
}
