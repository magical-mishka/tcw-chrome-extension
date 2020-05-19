var contextMenuItem = {
    "id": "saveCode",
    "title": "Save Code Snippet",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem, null);

chrome.contextMenus.onClicked.addListener(function (info, tab){
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        // selected contains text including line breaks
        var selected = selection[0];
    chrome.tabs.sendMessage(tab.id, { save: "snippet", code: selected }, function (response) {
        if (chrome.runtime.lastError) { 
          alert("This page needs to be refreshed once post-installation of the extension."); //for pages that haven't been refreshed after extension installation
         }
      });
    });
});
 