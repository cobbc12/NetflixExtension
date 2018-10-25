window.setInterval(function(){
    var title = document.querySelector("#meta").innerText + ' ' + document.querySelector("#info").innerText;

    chrome.runtime.sendMessage({metadata: title, type: 'update metadata'});
    
    
}, 5000);


