// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Schemas
var Executive = require("./models/Executive");
var Legislative = require("./models/Legislative");
var Organization = require("./models/Organization");
var Parties = require("./models/Parties");
var Article = require("./models/Article");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

// Create Instance of Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------


//mongodb://heroku_nhk3bbmv:7dml376seb3b2ousnha7pg75s@ds155418.mlab.com:55418/heroku_nhk3bbmv

//mongoose.connect("mongodb://heroku_nhk3bbmv:7dml376seb3b2ousnha7pg75s@ds155418.mlab.com:55418/heroku_nhk3bbmv");

var databaseURi = "mongodb://localhost/bubblebust_db";

if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseURi);
}

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "./public/index.html");
});

//scrape routes
require("./controllers/scrape-routes.js")(app);
// -------------------------------------------------
// mongoose logic goes here
require("./controllers/api-routes.js")(app);



// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


