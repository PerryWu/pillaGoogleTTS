
var spawn = require('child_process').spawn;
var request = require("request");
var fs = require('fs');

var tts = {};
tts.speak = function speak(text, lang) {

	if(typeof lang == 'undefined' || !lang) 
		lang = "en";

	//var child = spawn('/usr/bin/mpg123',['-']);
	var child = spawn('/usr/bin/mplayer',['-cache', '1024', '-']);
	var url = "http://translate.google.com/translate_tts?tl="+lang+"&q=" + text;
	var r = request({uri:url, headers: {'User-Agent': 'Mozilla/5.0'}});

	console.log(url);

	r.on('error', function (err) {
			console.log(err);
			});

	r.on('complete', function(e) {
			console.log("complete");
			});

	r.on('response', function(response) {
			if(response.statusCode !== 200) {
			console.log(response.statusCode); // 200 
			console.log(response.headers);  
			}
			});

	r.pipe(child.stdin);
}

module.exports = tts;
