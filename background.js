'use strict';

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

    chrome.tabs.create({ //To start sign user into extension
      url: 'https://www.thiscodeworks.com/extension/initiate'
    });
  });
