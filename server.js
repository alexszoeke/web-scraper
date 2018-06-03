var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

var PORT =  process.env.PORT || 8888;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(path.join(__dirname, '/public')));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articles";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);


app.listen(PORT, function() {
    console.log("App running on http://localhost:" + PORT + " !");
  });