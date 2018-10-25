var user = 'cam'; 

var time = {}; 

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if (request.type == 'getTime'){
	    sendResponse({videoTime:time[request.url]});
	}
	if (request.type == 'update time'){
	    time[sender.tab.url] = request.videoTime;

	    // The URL to POST our data to
	    var postUrl = 'https://homes.cs.washington.edu/~cobbc12/submit_tv_data.php';

	    
	    var xhr = new XMLHttpRequest();
	    xhr.open('POST', postUrl, true);

	    

	    // Prepare the data to be POSTed by URLEncoding each field's contents
	    var url = sender.tab.url;
	    var sendertime = request.videoTime;
	    
	    var params = 'user=' + encodeURIComponent(user) + 'url=' + encodeURIComponent(url) +
		'&videotime=' + encodeURIComponent(sendertime) ;

	    // Replace any instances of the URLEncoded space char with +
	    params = params.replace(/%20/g, '+');
	    
	    // Set correct header for form data
	    var formContentType = 'application/x-www-form-urlencoded';
	    xhr.setRequestHeader('Content-type', formContentType);

	    
	    xhr.send(params);
	    
	}      
      
  });

