var requestURL = "";
var request = new XMLHttpRequest();
var url = "../script/fuck.json";

window.onload = function(){
    request.open("GET", url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){
            var json = JSON.parse(request.response);
            for(var i=0;i<json.length;i++){
                console.log(json[i].name);
            }
            console.log(json);
        }
    }
}

function addmenu() {
    var menu = document.getElementById("menu");

    for (var i = 0; i < length; i++) {
        var newDiv = document.createElement('div');
        newDiv.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
        newDiv.id = "1";
        menu.appendChild();
    }
    var plusMenu = document.createElement('div');
    var plusImg = document.createElement('img');
    plusImg.src = "../image/plus.png";
    plusImg.width = "100%";
    plusMenu.appendChild(plusImg);
    plusMenu.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
    plusMenu.onclick = "addmenu()";
    plusMenu.id = "regis";
    menu.appendChild(plusMenu);

    /*for (var i = 0; i <reader.length;i++){

    }*/
}

/*function request() {
    var request = new XMLHttpRequest();

    request.open('GET', requestURL);

    request.responseType = 'json';

    request.send();

    request.onload = function () {
        var dishes = request.response;
    }
}*/