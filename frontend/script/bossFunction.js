var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";

function init() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        let d = document.getElementById("main");
        var menu = document.createElement("div");
        menu.id = "menu";
        for (var i = 0; i < json.length; i++) {
            var newDiv = document.createElement("div");
            var newImg = document.createElement("img");
            newImg.src = "../image/plus.png";
            newImg.style = "width: 100%";
            newDiv.appendChild(newImg);
            if (i % 2 == 0) {
                newDiv.style =
                    "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 15%; margin-top: 20%;";
            } else {
                newDiv.style =
                    "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:right;margin-right: 15%; margin-top: 20%;";
            }
            newDiv.onclick = function () {

            };
            newDiv.id = json[i]._id;
            menu.appendChild(newDiv);
        }
        var plusMenu = document.createElement("div");
        var plusImg = document.createElement("img");
        plusImg.src = "../image/plus.png";
        plusImg.style = "width: 100%";
        plusMenu.appendChild(plusImg);
        if (json.length % 2 == 1) {
            plusMenu.style =
                "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:right;margin-right: 15%; margin-top: 20%;";
        } else {
            plusMenu.style =
                "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 15%; margin-top: 20%;";
        }
        plusMenu.onclick = function () {
            window.location.replace("editmenuplus.html", "新增餐點");
        };
        plusMenu.id = "regis";
        menu.appendChild(plusMenu);
        d.appendChild(menu);
    };
    request.send(null);
}

function editInit() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        document.getElementById("food_id").value = json[0]._id;
        document.getElementById("name").value = json[0].food_name;
        document.getElementById("description").value = json[0].description;
        document.getElementById("price").value = json[0].price;
        console.log(json);
    };
    request.send(null);
}

function btnOperate(op)
 {
    var value = Number(document.getElementById("num").value);
    if (op == '+') {
        value += 1;
    } else if (op == '-') {
        if (value <= 1) {
            value = 1;
        } else {
            value -= 1;
        }
    }
    var json = JSON.parse(request.response);
    document.getElementById("num").value = value;
    var price = document.getElementById("price").value;
    document.getElementById("price").value = json[0].price * document.getElementById("num").value;
}