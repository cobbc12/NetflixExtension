var uid;
var metadata;
var time = {}; 

function handleMessage(request, sender, sendResponse) {
	if (request.type == 'getMetadata'){
	    sendResponse({metadata:metadata});
	}
	if (request.type == 'getUser'){
	    sendResponse({user:uid});
	}
	if (request.type == 'update metadata'){
	    metadata = request.metadata;
	}
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
	    
	    var params = 'uid=' + encodeURIComponent(uid) + 'url=' + encodeURIComponent(url) +
		'&videotime=' + encodeURIComponent(sendertime) ;

	    // Replace any instances of the URLEncoded space char with +
	    params = params.replace(/%20/g, '+');
	    
	    // Set correct header for form data
	    var formContentType = 'application/x-www-form-urlencoded';
	    xhr.setRequestHeader('Content-type', formContentType);
	    
	    xhr.send(params);	    
	}      
}

function onConsentObtained(_uid) {
	if (uid) {
		return;
	}
	uid = _uid;
	chrome.runtime.onMessage.addListener(handleMessage);
}

chrome.runtime.onInstalled.addListener(function (object) {
	if (object.reason == chrome.runtime.OnInstalledReason.INSTALL) {
		chrome.storage.local.get('uid', function(items) {
			if (!('uid' in items)) {
				chrome.tabs.create({url:chrome.extension.getURL("consent.html")});
			}
		});
	}
});

chrome.storage.local.get('uid', function(items) {
	if ('uid' in items) {
		onConsentObtained(items.uid);
	} else {
		chrome.storage.onChanged.addListener(function(changes, namespamce) {
			if ('uid' in changes) {
				onConsentObtained(changes.uid.newValue);
			}
		});
	}
});