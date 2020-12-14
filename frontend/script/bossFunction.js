var request = new XMLHttpRequest();
var url = "http://localhost:3000";

window.onload = init();

function init() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        let d = document.getElementById("main");
        var menu = document.createElement('div');
        menu.id = "menu";
        for (var i = 0; i < json.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
            newDiv.id = i;
            newDiv.textContent = json[i].proName + json[i].proPrice;
            menu.appendChild(newDiv);
        }
        var plusMenu = document.createElement('div');
        var plusImg = document.createElement('img');
        plusImg.src = "../image/plus.png";
        plusImg.style = "width: 100%";
        plusMenu.appendChild(plusImg);
        plusMenu.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
        plusMenu.onclick = function(){window.open('editmenuplus.html','1234');};
        plusMenu.id = "regis";
        menu.appendChild(plusMenu);
        d.appendChild(menu);
        console.log(json);
    }
    request.send(null);
}

function addmenu() {
    var json = JSON.parse(request.response);
    let d = document.getElementById("main");
    let d_nest = document.getElementById("menu");
    d.removeChild(d_nest);

    var menu = document.createElement('div');
    menu.id = "menu";

    for (var i = 0; i < json.length; i++) {
        var newDiv = document.createElement('div');
        newDiv.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
        newDiv.id = i;
        newDiv.textContent = json[i].proName + json[i].proPrice;
        menu.appendChild(newDiv);
    }
    var plusMenu = document.createElement('div');
    var plusImg = document.createElement('img');
    plusImg.src = "../image/plus.png";
    plusImg.style = "width: 100%";
    plusMenu.appendChild(plusImg);
    plusMenu.style = "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; margin-left: 15%; margin-top: 20%;";
    plusMenu.onclick = function(){window.open('editmenuplus.html','1234');};
    plusMenu.id = "regis";
    menu.appendChild(plusMenu);
    d.appendChild(menu);

}
