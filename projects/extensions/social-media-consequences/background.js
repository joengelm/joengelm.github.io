
//this is a background script, it runs consistently in the background,
//useful if you need to keep track of info between pages
//or have stuff you don't want to load on every page
chrome.extension.onMessage.addListener(
  function(message, sender, sendResponse) {
  	if(message.timeUp){
		chrome.tabs.update({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
  	}
  });