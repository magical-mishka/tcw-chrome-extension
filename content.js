let codeBlocks = document.getElementsByTagName("pre");

for (elt of codeBlocks) {
    var textCode = encodeURIComponent(elt.innerText);
    var textCode = textCode.replace("(", "%28").replace(")", "%29").replace(/'/g, "%27");
    console.log("elt is "+textCode);
    elt.insertAdjacentHTML("afterend", "<a href='http://www.thiscodeworks.com/new?code="+textCode+"&url="+window.location.href+"'target='_blank'><u>Save code</u><a>");
}
