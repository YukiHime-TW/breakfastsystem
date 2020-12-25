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
            newDiv.id = json[i]._id;
            menu.appendChild(newDiv);
            newDiv.onclick = function (i) {
                    var json = JSON.parse(request.response);
                    localStorage.setItem('id', json[i].price);
                
            };
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

function btnOperate(op) {
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

function MakingorderInit() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        console.log(json);
        var table = document.getElementById("table");
        var tbody = document.createElement("tbody");
        for (var i = 0; i < json.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var input = document.createElement("input");
            var input1 = document.createElement("input");
            var form = document.createElement("form");
            input.type = "hidden";
            input.value = json[i]._id;
            input.name = "_id";
            input1.type = "submit";
            input1.value = "未完成";
            form.method = "post";
            form.appendChild(input);
            form.appendChild(input1);
            td2.appendChild(form);
            td.innerHTML = json[i].food_name;
            tr.appendChild(td);
            td1.innerHTML = json[i].price;
            tr.appendChild(td1);
            tr.appendChild(td2)
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    }
    request.send(null);

}