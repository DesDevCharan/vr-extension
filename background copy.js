chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.');
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        window.tabId = activeTab.id;
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
      });
  
    chrome.scripting.executeScript({
      target: {tabId: window.tabId},
      files: ['content.js'],
    });
  });
  