window.setInterval(function(){
    var videotime = document.querySelector( "video" ).currentTime;
    console.log(videotime);

    chrome.runtime.sendMessage({videoTime: videotime}, function(response) {
    });

    
}, 5000);


