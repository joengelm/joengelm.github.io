
//this is a background script, it runs consistently in the background,
//useful if you need to keep track of info between pages
//or have stuff you don't want to load on every page

var airhorn = new Audio("airhorn.mp3")


chrome.extension.onMessage.addListener(
  function(message, sender, sendResponse) {
  	if(message.playAirhorn == true){
  		if(airhorn.currentTime > 0){
  			airhorn.currentTime = 0;
  		}
  		if(airhorn.currentTime == 0){
  			airhorn.play();
  		}
  	}
  });