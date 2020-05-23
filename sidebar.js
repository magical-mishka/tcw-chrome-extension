var userID;

//Get UserID from storage and then generate list if available
chrome.storage.local.get(['id'], function (result) {
    userID = result.id;
    if (userID) {
        getPosts();
    } else {
        document.getElementById("myDiv").innerHTML = "<a href='https://www.thiscodeworks.com/extension/initiate' target='_blank'>Error! You need to login. Click here.</a>";
    }
});

//Request list of posts by user from thiscodeworks.com
function getPosts() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                document.getElementById("myDiv").innerHTML = "";
                document.getElementById("myDiv").appendChild(buildList(xmlhttp.responseText));
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", "https://www.thiscodeworks.com/user/" + userID + "/extension", true);
    xmlhttp.send();
}

//Generate unorderded list from data & insert in sidebar
function buildList(data) {

    var json = JSON.parse(data);
    var list = document.createElement("ul");
    for (var i = 0, n = json.length; i < n; i++) {
        var anchor = document.createElement("a");
        anchor.innerHTML = json[i].title;
        var code = document.createElement("pre");
        code.innerText = json[i].code;
        code.setAttribute("class", "hide");
        var item = document.createElement('li');
        item.appendChild(anchor);
        item.appendChild(code);
        list.appendChild(item);
        var expand = document.createElement("a");
        expand.setAttribute("href", "https://www.thiscodeworks.com/"+json[i]._id);
        anchor.setAttribute("href", "#");
        expand.setAttribute("target", "_blank");
        expand.setAttribute("class", "expand");
        expand.setAttribute("title", "Open & edit in new tab");
        expand.classList.toggle("hide");
        anchor.insertAdjacentElement("afterend", expand);

    }
    return list;
}

//Function that sends request to content script to kill sidebar
document.getElementById("destroySidebar").addEventListener("click", function () {
    parent.window.postMessage("removesidebar", "*");
});

//Expand/collapse code block in list
document.addEventListener("click", function (event) {
    if(event.target.tagName.toLowerCase() === "pre"){return}; //prevents close on clicking code
    var pre = event.target.closest("li").querySelector("pre");
    if (pre!= null){
        pre.classList.toggle("hide");
        var expand = event.target.closest("li").querySelector(".expand");
        expand.classList.toggle("hide");
        if (expand.querySelector("img") != null){
            expand.innerHTML = "";
            return
        }
        var image = document.createElement("img");
        image.setAttribute("src", chrome.runtime.getURL("images/expand.png"));
        expand.appendChild(image);
      
    };
});

