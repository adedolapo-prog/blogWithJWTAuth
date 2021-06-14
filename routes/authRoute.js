const express = require("express")
const router = express.Router()

const authController = require("../controller/authController.js")

//create the sign up routes
router.get("/signup", authController.signup_get)

router.post("/signup", authController.signup_post)

//create login routes
router.get("/login", authController.login_get)

router.post("/login", authController.login_post)

module.exports = router
