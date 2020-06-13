'use strict';

chrome.storage.local.get(['id'], function (result) {
  if (result.id) {
      return
  } else {
    chrome.tabs.create({ //To start sign user into extension
      url: 'https://www.thiscodeworks.com/extension/initiate'
    });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
    });
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.logged == "yes"){
        getUserId();   //Save user ID for getting & saving code without visiting thiscodeworks.com
      }
      if (request.github == "newtab"){
        chrome.tabs.create({ //To start sign user into extension
          url: request.url
        });
      }
    });


// Function to get and locally save userID from thiscodeworks.com
function getUserId() {

  chrome.storage.local.clear(); //Delete previous ID
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
               chrome.storage.local.set({"id": xmlhttp.responseText}, function(){
              })               
          }
          else if (xmlhttp.status == 400) {
              alert('Error 400 --> Please send a screenshot & some context of this error to info@thiscodeworks.com');
          }
          else {
              alert('Error != 400 --> Please send a screenshot & some context of this error to info@thiscodeworks.com');
          }
      }
  };

  xmlhttp.open("GET", "https://www.thiscodeworks.com/extension/user-id", true);
  xmlhttp.send();
}
