const User = require("../model/userModel.js")
const jwt = require("jsonwebtoken")

//error handler
const handleErrors = err => {
  let errors = { email: "", password: "" }

  if (err.code === 11000) {
    errors.email = "that email is already registered"
    return errors
  }

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = id => {
  return jwt.sign({ id }, "net ninja student secret", { expiresIn: maxAge })
}

module.exports.signup_get = (req, res) => {
  res.render("signup")
}

module.exports.signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body)
    const token = createToken(user._id)
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ status: "success", user: user._id })
  } catch (error) {
    const errorMessages = handleErrors(error)
    res.status(400).json({ status: "failed", errors: errorMessages })
  }
}

module.exports.login_get = (req, res) => {
  res.render("login")
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    res.status(200).json({ user: user._id })
  } catch (error) {
    res.status(400).json({})
  }
}
