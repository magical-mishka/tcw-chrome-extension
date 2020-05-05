let codemirrorBlocks = document.getElementsByClassName("CodeMirror-code");

if (codemirrorBlocks.length === 0) { //For simple <pre> blocks
    let codeBlocks = document.getElementsByTagName("pre");
    for (elt of codeBlocks) {
        addBtn(elt, elt.innerText);
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
function addBtn (element, text){
    var textCode = text.replace(/'/g, "%27");
    element.insertAdjacentHTML("afterend", "<a href='http://www.thiscodeworks.com/new?code=" + encodeURIComponent(textCode) + "&url=" + window.location.href + "'target='_blank'><u>Save code</u><a>");
}
