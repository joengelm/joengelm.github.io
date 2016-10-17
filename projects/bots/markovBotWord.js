var fs = require('fs');
eval(fs.readFileSync("nodeMarkov.js","utf-8"));
var markov = new MarkovGeneratorWord(2,12)
var text = fs.readFileSync('../week3-markov/trump.txt', "utf-8")
markov.feed(text)
function generate(){
	var t = markov.generate()
	console.log(t)
}
setInterval(generate,2000)