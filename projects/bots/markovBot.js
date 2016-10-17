var fs = require('fs');
eval(fs.readFileSync("nodeMarkov.js", "utf-8"));
var markov = new MarkovGenerator(2, 16);
var text = "Juniper Styles Isaiah Brand JJ Chen Aubrey DeRonde Joe Engelman Andrew Ganem Simon Jones Jack Kelly Harry Kettelberger Will Thompson Neil Wathore Alexis Viera";
markov.feed(text);
function generate() {
	var t = markov.generate();
	console.log(t);
}
setInterval(generate, 2000);
