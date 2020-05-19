//Insert save code button below code blocks
let codemirrorBlocks = document.getElementsByClassName("CodeMirror-code");
if (codemirrorBlocks.length === 0) { //For simple <pre> blocks
    let codeBlocks = document.getElementsByTagName("pre");
    for (elt of codeBlocks) {
        if (elt.classList.contains("tw-ta")){ //No button on Google Translate
            //Do nothing
        } else {
            var preClasses = elt.className;//to detect language of snippet in class
            var lang = "";
            if (preClasses.includes("lang-")){
                lang = preClasses.split('lang-').pop().split(' ')[0];
            }
            if (preClasses.includes("language-")){
                lang = preClasses.split('language-').pop().split(' ')[0];
            }
            var style = window.getComputedStyle(elt);
            var originalMargin = style.marginBottom;
            elt.style.marginBottom = 0;
            addBtn(elt, elt.innerText, originalMargin, lang);
        }
    }
} else {
    for (elt of codemirrorBlocks) { // For sites that use Codemirror like Codepen, JSFiddle
        if (elt.classList.contains("tw-ta")){ //No button on tcw
            //Do nothing
        } else {
        var textBlock = elt.innerText;
        var lineNumbers = elt.getElementsByClassName("CodeMirror-linenumber");
        for (var i = 0; i < lineNumbers.length; i++) { // remove linenumbers from snippet
            textBlock = textBlock.replace(lineNumbers[i].innerText, "");
        }
        addBtn(elt, textBlock);
        }
    }
}

//Function to insert save code button
function addBtn(element, text, margin, lang) {
    var textCode = text.replace(/'/g, "%27");
    var url = chrome.runtime.getURL("images/saveicon.png");
    element.insertAdjacentHTML("afterend", "<div style='text-align:right; margin-bottom:" + margin + ";'><span style='background:#455a64; padding: 5px; border-radius: 0 0 5px 5px;  display: inline-block;'><a src='https://www.thiscodeworks.com/new?code=" + encodeURIComponent(textCode) + "&url=" + window.location.href + "&pagetitle=" + encodeURIComponent(document.title) + "&lang="+lang+"' class='saveCodeBtn' style='color: white; text-decoration: none; text-shadow: none;'><img src='" + url + "' style='margin:0; vertical-align: bottom; height: 19px; width: 19px;background: #ffffff00; border: none;'> Save<a></span></div>");
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request === "sidebar") { //Creates sidebar for recent saves
            sendResponse({ received: "check" });
            var src = chrome.runtime.getURL("sidebar.html");
            var newFrame = document.createElement("iframe");
            newFrame.style.width = "500px";
            newFrame.style.position = "fixed";
            newFrame.style.zIndex = 9999;
            newFrame.style.height = "100vh";
            newFrame.style.top = 0;
            newFrame.setAttribute("src", src);
            newFrame.setAttribute("id", "code-sidebar");
            document.body.appendChild(newFrame);
        }
        if (request.save === "page") { //Content popup form to save webpage selected in popup.html
            sendResponse({ received: "check" });
            createPopup(request.link, null);
        }
        if (request.save === "snippet") { //Content popup form to save snippet selected in context menu
            sendResponse({ received: "check" });
            createPopup(null, request.code);
        }
    });

//create element to contain save code popup & preloader
var saveFrame = document.createElement("div");
saveFrame.setAttribute("id", "save-code-popup-parent")
document.body.appendChild(saveFrame);

//Suicide request for iframe
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
    if (event.data == "removesidebar") {//destroys sidebar
        var element = document.getElementById('code-sidebar');
        element.parentNode.removeChild(element);
    }
    if (event.data == "removetheiframe") {//destroys save code popup
        var iframe = document.getElementById('save-code-popup');
        iframe.parentNode.removeChild(iframe);
        saveFrame.removeAttribute("style");    
    }
}

//Save snippet pop-up generator
var saveBtns = document.getElementsByClassName("saveCodeBtn");
for (var i = 0; i < saveBtns.length; i++) {
    saveBtns[i].addEventListener("click", function () {
       createPopup(this.getAttribute("src"));
    });
}

//Kill save code popup when clicked outside frame
var popup = document.getElementById("save-code-popup-parent");
document.addEventListener('click', function (event) {
    var iframe = document.getElementById('save-code-popup');
    if (iframe){
        var isClickInside = popup.contains(event.target);
        if (event.target.classList.contains('saveCodeBtn')) return;
        if (!isClickInside) {
            iframe.parentNode.removeChild(iframe);
            popup.removeAttribute("style");
        }
    } return;
}, false);

//Send URL to background.js for intializing
if (window.location.href === "https://www.thiscodeworks.com/extension/initializing") {
    chrome.runtime.sendMessage({ logged: "yes" });
}

//popup to generate iframe with embedded form from thiscodeworks.com to save code
function createPopup(src, code){
    var form = document.createElement("iframe");
    form.setAttribute("id", "save-code-popup");
    if (code) {
        var textCode = code.replace(/'/g, "%27");
        form.setAttribute("src", "https://www.thiscodeworks.com/new?code=" + encodeURIComponent(textCode) + "&url=" + window.location.href + "&pagetitle=" + encodeURIComponent(document.title));
    } else {
        form.setAttribute("src", src);
    }
    var parent = document.getElementById("save-code-popup-parent");
    parent.style.width = "80%";
    parent.style.height = "80%";
    parent.style.position = "fixed";
    parent.style.zIndex = 9999;
    parent.style.top = "10%";
    parent.style.left = "10%";
    parent.style.border = "1px solid darkgray";
    parent.style["box-shadow"] = "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)";
    form.style.width = "100%";
    form.style.height = "100%";
    parent.style.background = "rgba(0, 0, 0, 0.5)";
    parent.appendChild(form);
}