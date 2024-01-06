const jwt = require('jsonwebtoken')
const { SECRET, TOKEN_EXPRIRES } = require('../config')

const signJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user: {
        id: userId,
      },
    }

    jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPRIRES }, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}

module.exports = signJWT
