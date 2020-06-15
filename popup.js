'use strict';

//When Recent Saves is clicked, a message is sent to content.js to activate sidebar
document.addEventListener('DOMContentLoaded', function () {
  let recent = document.getElementById('recent-saves');
  if (recent != null) {
    recent.addEventListener('click', function (response) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "sidebar", function (response) {
          if (chrome.runtime.lastError) {
            var url = chrome.runtime.getURL("sidebar.html"); // opens sidebar in new tab if there is an issue.
            chrome.tabs.create({ url });
            window.close(); //close popup
          } else {
            window.close(); //close popup
          }
        });
      });
    });
  }

  let disable = document.getElementById('disable-btn');
  if (disable != null) {
    chrome.storage.local.get(['disable'], function (result) {
      if (result.disable == true) {
        disable.checked = true;
        return
      } else {
        disable.checked = false;
        return
      }
    });
    disable.addEventListener('change', function (response) {
      if (disable.checked) {
        chrome.storage.local.set({ "disable": true }, function () {
          alert("Please refresh pages for this change to take effect")
        })
      } else {
        chrome.storage.local.set({ "disable": false }, function () {
          alert("Please refresh pages for this change to take effect")
        })
      }
    })
  }
});

chrome.tabs.getSelected(null, function (tab) { // null defaults to current window
  var title = tab.title;
  var url = tab.url;

  let saveLink = document.getElementById('save-link'); // To save webpage
  if (saveLink !== null) {
    var link = "https://www.thiscodeworks.com/newlink?url=" + url + "&pagetitle=" + title; //Create save URL
    saveLink.addEventListener('click', function (response) {
      if (link.includes("https")) {
        chrome.tabs.sendMessage(tab.id, { save: "page", link: link }, function (response) {
          if (chrome.runtime.lastError) {
            alert("This page needs to be refreshed once post-installation of the extension."); //for pages that haven't been refreshed after extension installation
            window.close(); //close popup
          } else {
            window.close(); //close popup
          }
        });
      }
    });
  }
});

