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

// Define the model 
var toDo = mongoose.model('Todo', {
	text: String
})

// Setting up the routes //  

// api 
// get all todos

app.get('/api/todos', function(req, res){
	// use mongoose to get all todos in the DB 
	toDo.find(function(err, todos){
		// if there is an error retrieving, send the error, nothing after res.send(err) will execute
		if(err){
			res.send(err);
		};
		res.json(todos) // return all the todos in JSON format
	});
});

// create todo and send back all todos after the creation
app.post('/api/todos', function(req, res){

	// create a todo, information comes from AJAX request in Angular 
	toDo.create({
		text : req.body.text,
		done : false
	}, function(err, todos){
		if(err) res.send(err);

		toDo.find(function(err, todos){
			if(err) res.send(err);
			res.json(todos);
		});
	});
});

//delete a todo
app.delete('/api/todos/:todo_id', function(req, res){
	toDo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		 	if(err) res.send(err);
		 	

		 	// get and return all the todos after you delete one
		 	toDo.find(function(err, todos){
		 		if(err) res.send(err);
		 		res.json(todos);
		 	});
	});
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
	// load the single view file - angular will handle the page changes on the front end
})

app.listen(8080);
console.log("App listening on port 8080");




