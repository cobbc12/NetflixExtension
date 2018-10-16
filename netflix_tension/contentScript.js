window.setInterval(function(){
    var videotime = document.querySelector( "video" ).currentTime;
    console.log(videotime);

    chrome.runtime.sendMessage({videoTime: videotime});
    
}, 5000);


