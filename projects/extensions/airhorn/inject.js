//This is the code that will be injected on any page
Mousetrap.bind("`", function(){
	chrome.runtime.sendMessage({playAirhorn:true})
})