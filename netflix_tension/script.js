chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    document.getElementById("url").value=url;

    chrome.runtime.sendMessage({type: 'getTime', url: url}, function(response){
	document.getElementById("videoTime").value=response.videoTime;
    });

    chrome.runtime.sendMessage({type: 'getMetadata', url: url}, function(response){
	document.getElementById("metadata").value=response.metadata;
    });
    chrome.runtime.sendMessage({type: 'getUser', url:url}, function(response){
	document.getElementById("user").value=response.user;
    });

    
    
});



function submitdata() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = 'https://homes.cs.washington.edu/~cobbc12/submit_tv_data.php';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);

    // Prepare the data to be POSTed by URLEncoding each field's contents
    var url = document.getElementById('url');
    var videoTime = document.getElementById('videoTime');
    
    var params = 'url=' + encodeURIComponent(url.value) +
                 '&videoTime=' + encodeURIComponent(videoTime.value);

    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '+');

    // Set correct header for form data
    var formContentType = 'application/x-www-form-urlencoded';
    xhr.setRequestHeader('Content-type', formContentType);

    // Handle request state change events
    xhr.onreadystatechange = function() {
        // If the request completed
        if (xhr.readyState == 4) {
            //statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                //statusDisplay.innerHTML = 'Saved!';
                window.setTimeout(window.close, 1000);
            } else {
                // Show what went wrong
                //statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    //statusDisplay.innerHTML = 'Saving...';
}




window.addEventListener('load', function(evt) {
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('form1')
            .addEventListener('submit', submitdata);
});

