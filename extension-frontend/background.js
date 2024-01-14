/* global chrome */

chrome.runtime.onInstalled.addListener(function() {
});

if (chrome.declarativeNetRequest && chrome.declarativeNetRequest.onRequest) {
  if (chrome.declarativeNetRequest.onRequest.getRules) {
    chrome.declarativeNetRequest.onRequest.getRules(rules => {
      console.log("Current rules:", rules);
    });
  } else {
    console.error("getRules method is not supported.");
  }
} else {
  console.error("chrome.declarativeNetRequest.onRequest is not defined.");
}
