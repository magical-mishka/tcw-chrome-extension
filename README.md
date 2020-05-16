# tcw-chrome-extension
Save &amp; collect code snippets that work on the web.

## INSTALLATION INSTRUCTIONS

1. Download ZIP. (Green button at the top right)
2. Extract to a safe place which won't be moved later (if you delete or move this folder, the extension won't work anymore).
3. Open Chrome and go to chrome://extensions/
4. [Enable Developer Mode](https://developer.chrome.com/extensions/faq#faq-dev-01)
5. Click the button at the top of the extensions page that says "Load unpacked" and load the folder that you downloaded which contains the extension.
6. The extension should be up and running. 

## HOW TO USE

1. Log in or sign up to thiscodeworks.com
2. Anytime you see a code snippet, click the "Save Code" button underneath to save that individual snippet. 
3. You can save the whole webpage by clicking the button in the toolbar.

## Change log

* v0.2 - Fixed bug where ()' were not encoded breaking the link to save code snippet.
* v0.3 - Resolved issue where the Save Code button would appear after each line on sites like Codepen which had used Codemirror. 
* v0.4 - Error in popup resolved for null value of saveLink (Thanks Saeed!) 
* v0.5 - Reversed brackets encoding.
* v0.6 - Saving code snippet now saves page title as well.
* v0.7 - Style changes to pop-up to match the website (Thank you Yayson!)
* v0.8 - Style changes to save snippet button - icon+text in form of label under code blocks
* v0.9 - Extension renamed to "Save Code"
* v0.9.1 - Removed unncessary permissions
* v0.9.2 - Exchanged "tabs" permision for "activeTab"
* v0.9.3 - URL fix for the save-icon. (Thanks again to Yayson!)
* v0.9.4 - Fixed icon height and width (to resolve issue on sites that have CSS styling for img tags)
* v0.9.5 - Set background-color of icon to transparent. For GitHub.
* v0.9.6 - Remove icon border for sites that set border styling to images.
* v0.9.7 - Sidebar for viewing all saved code without visiting website. Logged in users session ID saved by browser.
* v0.9.8 - Error handling for Code Sidebar for pages that aren't refreshed after installation.
* v0.9.9 - Shifted function to save user ID to background.js from pop.js so that login is no longer dependent on popup activation.
* v1.0.0 - Save code snippet within a popup on the same page.
* v1.0.1 - Removed content script on Google as the save button would appear on translation pages.
* v1.0.2 - Popup to save snippet will now close upon save. Removed text-shadow for sites that had text-shadow effect.
* v1.0.3 - Added collapsible code blocks to the sidebar. Warning for Google pages.

## CONTRIBUTE

[Github](https://github.com/magical-mishka/tcw-chrome-extension)

### License 

This code repository has no license. The purpose of providing public access to the extension is for developers using the extension to share suggestions and fixes to help make it better. 

Anybody contributing to this project does so under the agreement that they are entitled to provide a contribution, that they cannot withdraw permission to use their contribution at a later date, and that Mishka Orakzai (the creator of this project) has permission to use their contribution in commercial products pertaining to the Save Code Chrome Extension and Thiscodeworks.com website.
