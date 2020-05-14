'use strict';

//When Recent Saves is clicked, a message is sent to content.js to activate sidebar
document.addEventListener('DOMContentLoaded', function() {
  let recent = document.getElementById('recent-saves');
  if (recent != null)
    {
      recent.addEventListener('click', function(response) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, "sidebar", function(response) {
              if (chrome.runtime.lastError) {
                  alert("This page needs to be refreshed before you can access recent saves."); //for pages that haven't been refreshed after extension installation
              }
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
    saveLink.href = "http://www.thiscodeworks.com/newlink?url="+url+"&pagetitle="+title; //Save webpage
  } 
});

