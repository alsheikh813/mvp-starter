var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE


// 
var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

var Port = process.env.PORT || 3000

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))


// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// app.get('/', function (req, res) {
// 	//res.sendStatus(200)
// 	res.send("<h1>Hi</h1>")
// });


app.get('/items', function (req, res) {
	items.selectAll(function(err, data) {
		if(err) {
			res.sendStatus(500);
		} else {
			res.json(data);
		}
	});
});

app.post('/items', function (req, res) {
	console.log("POST")
	
	items.saveItem(req.body, function(err, data) {
		if(err) {
			res.sendStatus(500);
		} else {
			res.json(data);

			//res.send("Thanks")
		}
	});
})

app.listen(Port, function() {
	console.log('listening on port ', Port);
});

