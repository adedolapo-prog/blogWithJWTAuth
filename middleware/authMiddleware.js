const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  //check jwt exists and is valid
  if (token) {
    jwt.verify(token, "net ninja student secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.redirect("/login")
      } else {
        next()
      }
    })
  } else {
    res.redirect("/login")
  }
}

//check user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, "net ninja student secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken)
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkUser }
