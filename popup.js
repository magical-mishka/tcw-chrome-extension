'use strict';

document.addEventListener('DOMContentLoaded', function() {
  let recent = document.getElementById('recent-saves');
  if (recent != null)
    {
      recent.addEventListener('click', function(response) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'sidebar', function(response) {
            });
          });
    });
    } 
});

chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
  var title = tab.title;
  var url = tab.url;

  let saveLink = document.getElementById('save-link');
  if (saveLink !== null) {
    saveLink.href = "http://www.thiscodeworks.com/newlink?url="+url+"&pagetitle="+title;
  } 
});

