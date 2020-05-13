let codemirrorBlocks = document.getElementsByClassName("CodeMirror-code");

if (codemirrorBlocks.length === 0) { //For simple <pre> blocks
    let codeBlocks = document.getElementsByTagName("pre");
    for (elt of codeBlocks) {
        var style = window.getComputedStyle(elt);
        var originalMargin = style.marginBottom;
        elt.style.marginBottom = 0;
        addBtn(elt, elt.innerText, originalMargin);
    }
} else {
    for (elt of codemirrorBlocks) { // For sites that use Codemirror like Codepen, JSFiddle
        var textBlock = elt.innerText;
        var lineNumbers = elt.getElementsByClassName("CodeMirror-linenumber"); 
        for (var i = 0; i < lineNumbers.length; i++){ // remove linenumbers from snippet
            textBlock = textBlock.replace(lineNumbers[i].innerText,"");
        }
        addBtn(elt, textBlock);
    }
}

//Add save code button after code block
function addBtn (element, text, margin) {
    var textCode = text.replace(/'/g, "%27");
    var url=chrome.runtime.getURL("images/saveicon.png");
    element.insertAdjacentHTML("afterend", "<div style='text-align:right; margin-bottom:"+margin+";'><span style='background:#455a64; padding: 5px; border-radius: 0 0 5px 5px;  display: inline-block;'><a href='http://www.thiscodeworks.com/new?code=" + encodeURIComponent(textCode) + "&url=" + window.location.href + "&pagetitle="+encodeURIComponent(document.title)+"' target='_blank' style='color: white; text-decoration: none;'><img src='"+url+"' style='margin:0; vertical-align: bottom; height: 19px; width: 19px;background: #ffffff00; border: none;'> Save<a></span></div>");
}

//Upon receiving sidebar command and userID, iframe is created
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request === "sidebar") {
           var src = chrome.runtime.getURL("sidebar.html");
           var newFrame = document.createElement("iframe");
           newFrame.style.width = "250px";
           newFrame.style.position = "fixed";
           newFrame.style.zIndex = 9999;
           newFrame.style.height = "100vh";
           newFrame.style.top = 0;
           newFrame.setAttribute("src", src);
           newFrame.setAttribute("id", "code-sidebar");
           document.body.appendChild(newFrame);
        }

    });

    //Suicide request from Sidebar
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        if (event.data=="removetheiframe"){
           var element = document.getElementById('code-sidebar');
           element.parentNode.removeChild(element);
        }
     }


    