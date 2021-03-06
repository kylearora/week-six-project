const express = require("express")
const app = express()
const session = require("express-session")
const mongooseSession = require("mongoose-session")
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

const DBUrl = "mongodb://127.0.0.1:27017/snippet"
mongoose.connect(DBUrl)

var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true,
  store: mongooseSession(mongoose)
}
app.use(session(sess))


const routeApp = require("./routes/main")
app.use(routeApp)

const welcome = require("./routes/welcome")
app.use(welcome)

const newSnippet = require("./routes/newSnippet")
app.use(newSnippet)

const snippet = require("./routes/snippet")
app.use(snippet)

const edit = require("./routes/edit")
app.use(edit)


app.listen(3000, function(){
  console.log("Dang BRO, we are live!")
})
