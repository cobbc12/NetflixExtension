window.setInterval(function(){
    var videoelement = document.querySelector( "video" );
    if (videoelement){ 
	var videotime = videoelement.currentTime;

	chrome.runtime.sendMessage({videoTime: videotime, type: 'update time'});
    }
    
}, 5000);


