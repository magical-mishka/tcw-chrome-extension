var contextMenuItem = {
    "id": "saveCode",
    "title": "Save Code Snippet",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem, null);

chrome.contextMenus.onClicked.addListener(function (info, tab){
    chrome.tabs.sendMessage(tab.id, { save: "snippet", code: info.selectionText }, function (response) {
        if (chrome.runtime.lastError) { 
          alert("This page needs to be refreshed once post-installation of the extension."); //for pages that haven't been refreshed after extension installation
         }
      });
});
 