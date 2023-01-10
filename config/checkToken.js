// /config/checkToken.js
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Check for the token being sent in a header or a query parameter
  let token = req.get('Authorization') || req.query.token
  if (token) {
    token = token.replace('Bearer ', '')
    // Check if token is valid and not expired
    // const decoded = jwt.verify(token, process.env.SECRET)
    // req.user = decoded && decoded.user ? null : decoded.user
    // req.exp = decoded && decoded.exp ? null : new Date(decoded.exp * 1000)
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      req.user = err ? null : decoded.user
      // Can remove this...
      // If your app doesn't care
      req.exp = err ? null : new Date(decoded.exp * 1000)
    })
    console.log('tokenGood', token)
    return next()
  } else {
    console.log('tokenBad', token)
    // No token was sent
    req.user = null
    return next()
  }
}

