'use strict';


chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
  var title = tab.title;
  var url = tab.url;

  let saveLink = document.getElementById('save-link');
  if (saveLink !== null) {
    saveLink.href = "http://www.thiscodeworks.com/newlink?url="+url+"&pagetitle="+title;
  } 
});
