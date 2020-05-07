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
*v 0.9.2 - Exchanged "tabs" permision for "activeTab"

## CONTRIBUTE OR SHARE ISSUES

[Github](https://github.com/magical-mishka/tcw-chrome-extension)