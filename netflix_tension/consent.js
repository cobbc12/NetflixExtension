// From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}
  
document.getElementById('agreeButton').addEventListener('click', function(evt) {
    evt.preventDefault();
    uid = uuidv4();
    chrome.storage.local.set({'uid': uid, 'consentLocalTimestamp': Date.now()});
    window.setTimeout(function() {
        window.close();
    }, 150);
});

chrome.storage.local.get(['uid', 'consentLocalTimestamp'], function(items) {
    if ('uid' in items) {
        var agreeButton = document.getElementById('agreeButton');
        agreeButton.setAttribute('disabled', true);
        agreeButton.textContent = 'You agreed on ' +
            new Date(items.consentLocalTimestamp).toDateString();
    }
});