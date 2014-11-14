// setting up express
var express = require('express');
var app = express();

// creating app with express

var mongoose = require('mongoose'); 

var morgan = require('morgan');
// log requests to the console

var bodyParser = require('body-parser')
// pull information from HTML post 

var methodOverride = require('method-override');
// Use HTTP verbs such as PUT or DELETe in places client doesn't support 

// Configure Application 
// var dbURI = mongodb:oleg:oleg@proximus.modulusmongo.net:27017/xo2tuwEn
mongoose.connect('mongodb://oleg:oleg@proximus.modulusmongo.net:27017/xo2tuwEn');

app.use(express.static(__dirname + '/public'));
// set the static files location /public

app.use(morgan('dev'));
// log every request to the console

app.use(bodyParser.urlencoded({'extended': 'true' }));

app.use(bodyParser.json());
// parse application/json

app.use(bodyParser.json({ type: 'application/vnd/api + json' }));
// parse application/vnd.api+json as json 

app.use(methodOverride());

app.listen(8080);
console.log("App listening on port 8080");