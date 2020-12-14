var request = new XMLHttpRequest();
var url = "http://localhost:3000";

window.onload = function () {
    request.open("GET", url, true);
    request.responseType = 'json';
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.response);
            for (var i = 0; i < json.length; i++) {
                console.log(json[i].proName);
            }
            console.log(json);
        }
    }
    request.send(null);
}

function addmenu() {
    let d = document.getElementById("main");
    let d_nest = document.getElementById("menu");
    d.removeChild(d_nest);

    var menu = document.createElement('div');
    menu.id = "menu";

    for (var i = 0; i < length; i++) {
        var newDiv = document.createElement('div');
        newDiv.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
        newDiv.id = "1";
        menu.appendChild(newDiv);
    }
    var plusMenu = document.createElement('div');
    var plusImg = document.createElement('img');
    plusImg.src = "../image/plus.png";
    plusImg.style = "width: 100%";
    plusMenu.appendChild(plusImg);
    plusMenu.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
    plusMenu.onclick = "addmenu()";
    plusMenu.id = "regis";
    menu.appendChild(plusMenu);
    d.appendChild(menu);

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