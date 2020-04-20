let codeBlocks = document.getElementsByTagName("pre");

for (elt of codeBlocks) {
    var textCode = elt.innerText;
    elt.insertAdjacentHTML("afterend", "<a href='http://www.thiscodeworks.com/new?code="+encodeURIComponent(textCode)+"&url="+window.location.href+"'target='_blank'><u>Save code</u><a>");
}
