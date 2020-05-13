var userID;

//Get UserID from storage and then generate list if available
chrome.storage.local.get(['id'], function(result) {
    userID = result.id;
    if (userID){
        getPosts();
    } else {
        document.getElementById("myDiv").innerHTML = "<a href='www.thiscodeworks.com/extension/initiate' target='_blank'>Error! You need to login.</a>";
    }
});

//Request list of posts by user from thiscodeworks.com
function getPosts(){

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
            document.getElementById("myDiv").innerHTML = "";
            document.getElementById("myDiv").appendChild(buildList (xmlhttp.responseText));
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://www.thiscodeworks.com/user/"+userID+"/extension", true);
    xmlhttp.send();
}

//Generate unorderded list from data & insert in sidebar
function buildList(data){

    var json = JSON.parse(data);
    var list = document.createElement("ul");
    for (var i=0, n=json.length; i<n; i++) {
        var anchor = document.createElement("a");
        anchor.innerHTML = json[i].title;
        anchor.setAttribute("href", "https://www.thiscodeworks.com/"+json[i]._id);
        anchor.setAttribute("target", "_blank");
        var item = document.createElement('li');
        item.appendChild(anchor);
        list.appendChild(item);
    }
    return list;
}

//Function that sends request to parent to kill sidebar
document.getElementById("destroySidebar").addEventListener("click", function(){
    parent.window.postMessage("removetheiframe", "*");
});
