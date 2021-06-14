const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()

const router = require("./routes/authRoute.js")

// middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set("view engine", "ejs")

// database connection
const dbURI =
  "mongodb+srv://admin_blog:1T4MxvxwEdtigUp8@blogcluster.so1im.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", (req, res) => res.render("smoothies"))
app.use("/", router)

