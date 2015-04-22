/**
* Module dependencies.
*/

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var _ = require('lodash');
var fs = require('fs');
var util = require('util');
var async = require('async');
var tts = require('./lib/tts');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(logger(':method :url'));
app.use(methodOverride('_method'));
app.use(cookieParser('pilla'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'pilla, very secret'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.redirect('index.html');
});

app.post('/speak', function (req, res) {
	console.log(req.body.words);
	console.log(req.body.language);
	tts.speak(encodeURIComponent(req.body.words), req.body.language);
	res.send("done");
});

// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

