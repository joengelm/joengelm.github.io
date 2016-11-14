//This is the code that will be injected on any page
setTimeout(function(){
	alert("Get out while you can!")
}, 5000)

setTimeout(function(){
	chrome.runtime.sendMessage({timeUp: true})
}, 10000)