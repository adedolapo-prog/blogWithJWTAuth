const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "minimum password length is 6 characters"],
  },
})

//fire a function before the user is created and saved
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//fires a function after the user is created and saved
userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved")
  next()
})

//static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })

  if (user) {
    const auth = await bcrypt.compare(password, user.password)

    if (auth) {
      return user
    }
    throw Error("email or password is incorrect 1")
  }
  throw Error("email or password is incorrect 2")
}

const User = mongoose.model("user", userSchema)
module.exports = User
