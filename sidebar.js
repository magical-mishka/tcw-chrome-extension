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
    if (json.length == 0) {
        var none = document.createElement("p");
        none.innerText = "There seems to be nothing here :("
        return none;
    }
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
        var icons = document.createElement("span"); //Holds icons
        icons.setAttribute("class", "icons");
        var expand = document.createElement("a"); //Adds `open in new tab` btn
        expand.setAttribute("href", "https://www.thiscodeworks.com/" + json[i]._id);
        anchor.setAttribute("href", "javascript:;");
        expand.setAttribute("target", "_blank");
        expand.setAttribute("class", "expand");
        expand.setAttribute("title", "Open & edit in new tab");
        var copy = document.createElement("a"); //Adds `copy to clipboard` btn
        copy.setAttribute("class", "copy");
        copy.setAttribute("title", "Copy to clipboard");
        icons.classList.toggle("hide");
        icons.appendChild(expand);
        icons.appendChild(copy);
        anchor.insertAdjacentElement("beforebegin", icons);
    }
    return list;
}

//Function that sends request to content script to kill sidebar
document.getElementById("destroySidebar").addEventListener("click", function () {
    parent.window.postMessage("removesidebar", "*");
});

//Expand/collapse code block in list
var list = document.getElementById("myDiv");
list.addEventListener("click", function (event) {
    var code = event.target.closest("li").querySelector("pre").innerText;
    if (event.target.tagName.toLowerCase() === "pre") { return }; //prevents close on clicking code
    if (event.target.classList.contains("copy")) { //click to copy function
        var emptyArea = document.createElement('TEXTAREA');
        emptyArea.innerHTML = code;
        const parentElement = document.getElementById('myDiv');
        parentElement.appendChild(emptyArea);
        emptyArea.select();
        document.execCommand('copy');
        parentElement.removeChild(emptyArea);
        return
    }
    var pre = event.target.closest("li").querySelector("pre");
    if (pre != null) {
        pre.classList.toggle("hide");
        var icons = event.target.closest("li").querySelector(".icons");
        var expandA = event.target.closest("li").querySelector(".expand");
        var copyA = event.target.closest("li").querySelector(".copy");
        icons.classList.toggle("hide");
        if (icons.querySelector("img") != null) {
            expandA.innerHTML = "";
            copyA.innerText = "";
            return
        }
        var expand = document.createElement("img");
        expand.setAttribute("src", chrome.runtime.getURL("images/expand.png"));
        expandA.appendChild(expand);
        if (code !== "" && code !== "undefined") {
            var copy = document.createElement("img");
            copy.setAttribute("src", chrome.runtime.getURL("images/copy.png"));
            copy.setAttribute("class", "copy");
            copyA.appendChild(copy);
        }
    };
});

//Searchbar functions
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        getSearchResults();
    }
});
document.getElementById("search-btn").addEventListener("click", function () {
    getSearchResults();
});
function getSearchResults() {
    document.getElementById("myDiv").innerHTML = "Searching...";
    var query = document.getElementById("search-input").value;
    var selectTags = document.getElementById("search-options");
    var option = selectTags.options[selectTags.selectedIndex].value;
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
    xmlhttp.open("GET", "https://www.thiscodeworks.com/extension/user-search?search=" + query + "&option=" + option, true);
    xmlhttp.send();
}

