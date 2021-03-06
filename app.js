const { requireAuth, checkUser } = require("./middleware/authMiddleware")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

require("dotenv").config()

const router = require("./routes/authRoute.js")

// middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set("view engine", "ejs")

// database connection
const dbURI = process.env.DBURI

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(result =>
    app.listen(3000, () => console.log("server is running on port 3000"))
  )
  .catch(err => console.log(err))

// routes
app.get("*", checkUser)
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"))
app.use("/", router)
