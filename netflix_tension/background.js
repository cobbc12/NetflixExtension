chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      //console.log(request.videoTime);
      //document.getElementById("time").value=request.videoTime;

      // The URL to POST our data to
      var postUrl = 'https://homes.cs.washington.edu/~cobbc12/something.php';

      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', postUrl, true);

     

      // Prepare the data to be POSTed by URLEncoding each field's contents
      var url = sender.tab.url;
      var time = request.videoTime;
    
      var params = 'field1=' + encodeURIComponent(url) +
          '&field2=' + encodeURIComponent(time);

      // Replace any instances of the URLEncoded space char with +
      params = params.replace(/%20/g, '+');
      
      // Set correct header for form data
      var formContentType = 'application/x-www-form-urlencoded';
      xhr.setRequestHeader('Content-type', formContentType);

    
      xhr.send(params);
      
      
  });

