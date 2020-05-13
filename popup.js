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

  //For when browser is first installed
  if (url === "https://www.thiscodeworks.com/extension/initializing") {
    console.log("url matched");
      getUserId();   //Save user ID for getting & saving code without visiting thiscodeworks.com
    }
});


// Function to get and locally save userID from thiscodeworks.com
function getUserId() {
  chrome.storage.local.clear(function() {
    });
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
               chrome.storage.local.set({"id": xmlhttp.responseText}, function(){
              })               
          }
          else if (xmlhttp.status == 400) {
              alert('Error 400 --> Please send a screenshot & some context of this error to mishka@thiscodeworks.com');
          }
          else {
              alert('Error != 400 --> Please send a screenshot & some context of this error to mishka@thiscodeworks.com');
          }
      }
  };

  xmlhttp.open("GET", "https://www.thiscodeworks.com/extension/user-id", true);
  xmlhttp.send();
}
