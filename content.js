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
function addBtn (element, text, margin){
    var textCode = text.replace(/'/g, "%27");
    element.insertAdjacentHTML("afterend", "<div style='text-align:right; margin-bottom:"+margin+";'><span style='background:#455a64; padding: 5px; border-radius: 0 0 5px 5px;  display: inline-block;'><a href='http://www.thiscodeworks.com/new?code=" + encodeURIComponent(textCode) + "&url=" + window.location.href + "&pagetitle="+encodeURIComponent(document.title)+"' target='_blank' style='color: white; text-decoration: none;'><img src='chrome-extension://aggapgjocakendangifdnlmellmcdmpl/images/saveicon.png' style='margin:0; vertical-align: bottom; '> Save<a></span></div>");
}

