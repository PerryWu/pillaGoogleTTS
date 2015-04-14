var spawn = require('child_process').spawn;
var child = spawn('/usr/bin/mpg123',['-']);
var request = require("request");

var tts = {};

tts.speak = function speak(text, lang) {

	if(typeof lang == 'undefined' || !lang) lang = "en"

	var url = "http://translate.google.com/translate_tts?tl="+lang+"&q='" + text + "'";
	var r = request({uri:url});

	console.log(url);

	r.on('complete', function(e) {
		console.log("complete");
	});

	r.pipe(child.stdin);
}

module.exports = tts;