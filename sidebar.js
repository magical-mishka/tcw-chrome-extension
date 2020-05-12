var xmlhttp = new XMLHttpRequest();
        
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
       if (xmlhttp.status == 200) {
        //    document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
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

xmlhttp.open("GET", "https://www.thiscodeworks.com/user/5b6dd9705844a00b2e48ddba/extension", true);
xmlhttp.send();

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