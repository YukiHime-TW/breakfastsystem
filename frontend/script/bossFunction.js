var request = new XMLHttpRequest();
// var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
// var url = "http://localhost:3000/"
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
var url1 = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/order.json";

var div = new Array(0);
var image = new Array(0);
var td_item_state_value = new Array(0);
var button = new Array(0);

function init() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        let d = document.getElementById("main");
        var menu = document.createElement("div");
        menu.id = "menu";
        for (var i = 0; i < json.length; i++) {
            var font = document.createElement("div");
            div[i] = document.createElement("div");
            image[i] = document.createElement("img");
            image[i].src = "../image/plus.png";
            image[i].style = "width: 100%";
            div[i].appendChild(image[i]);
            if (i % 2 == 0) {
                div[i].style =
                    "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 15%; margin-top: 20%;";
            } else {
                div[i].style =
                    "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:right;margin-right: 15%; margin-top: 20%;";
            }

            font.style = "width:100%;background-color:black;opacity:0.5;position:relative; word-wrap:break-word;color:white";
            font.innerHTML = "<center>" + json[i].food_name + "$" + json[i].price;
            div[i].appendChild(font);

            div[i].id = json[i]._id;
            menu.appendChild(div[i]);
            div[i].setAttribute("onclick", `edit(${i})`);
            menu.appendChild(div[i]);
        }
        var plusMenu = document.createElement("div");
        var plusImg = document.createElement("img");
        var plusfont = document.createElement("div");
        plusfont.style = "width:100%;background-color:black;opacity:0.5;position:relative; word-wrap:break-word;color:white";
        plusfont.innerHTML = "<center>新增餐點";
        plusImg.src = "../image/plus.png";
        plusImg.style = "width: 100%";
        plusMenu.appendChild(plusImg);
        plusMenu.appendChild(plusfont);
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

function check() {
    var message = confirm("確定要新增嗎");
    newDish = document.getElementById("newDish");
    if (message == true) {
        newDish.submit();
        window.location.replace('editmenu.html', '編輯菜單');
    }
    else {
    }
}

function edit(i) {
    var json = JSON.parse(request.response);
    localStorage.setItem("id", json[i]._id);
    localStorage.setItem("name", json[i].food_name);
    localStorage.setItem("description", json[i].description);
    localStorage.setItem("price", json[i].price);
    window.location.replace("editmenumiddle.html", "編輯餐點");
}

function editInit() {
    request.open("GET", url, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        document.getElementById("food_id").value = localStorage.getItem("id");
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("description").value = localStorage.getItem("description");
        document.getElementById("price").value = localStorage.getItem("price");
        console.log(json);
    };
    request.send(null);
}

function GetoutEdit() {
    localStorage.clear();
    window.location.replace("editmenu.html", "餐點");
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
    request.open("GET", url1, true);
    request.onload = function () {
        var json = JSON.parse(request.response);
        console.log(json);
        var table = document.getElementById("table");
        var tbody = document.createElement("tbody");

        for (var i = 0; i < json.length; i++) {

            var tr_item = document.createElement("tr");             //中文標示 訂單編號 欲取餐時間 訂單狀態
            var td_item_order = document.createElement("td");
            td_item_order.innerHTML = "<center>訂單編號";
            var td_item_arrive_time = document.createElement("td");
            td_item_arrive_time.innerHTML = "<center>欲取餐時間";
            var td_item_state = document.createElement("td");
            td_item_state.innerHTML = "<center>訂單狀態";
            tr_item.appendChild(td_item_order);
            tr_item.appendChild(td_item_arrive_time);
            tr_item.appendChild(td_item_state);

            var tr_item_food = document.createElement("tr");        //中文標示 食物名稱 數量 餐點狀態
            var td_item_food_name = document.createElement("td");
            td_item_food_name.innerHTML = "<center>食物名稱";
            var td_item_food_amount = document.createElement("td");
            td_item_food_amount.innerHTML = "<center>數量"
            var td_item_food_state = document.createElement("td");
            td_item_food_state.innerHTML = "<center>餐點狀態";
            tr_item_food.appendChild(td_item_food_name);
            tr_item_food.appendChild(td_item_food_amount);
            tr_item_food.appendChild(td_item_food_state);


            var tr_item_value = document.createElement("tr");           //訂單編號 欲取餐時間 訂單狀態 的值
            var td_item_order_value = document.createElement("td");
            tr_item_value.style = "background:white;"
            td_item_order_value.innerHTML = "<center>" + json[i].order_id;
            var td_item_arrive_time_value = document.createElement("td");
            td_item_arrive_time_value.innerHTML = "<center>" + json[i].arrive_time;
            td_item_state_value[i] = document.createElement("td");
            td_item_state_value[i].setAttribute("align", "center");


            button[i] = document.createElement("button");
            button[i].setAttribute("class", "btn btn-warning");

            if (json[i].state == 2)
                button[i].innerHTML = "<center>" + "未完成";
            else
                button[i].innerHTML = "<center>" + "未取單";

            button[i].setAttribute("onclick", `state(${i})`);
            td_item_state_value[i].appendChild(button[i]);
            tr_item_value.appendChild(td_item_order_value);
            tr_item_value.appendChild(td_item_arrive_time_value);
            tr_item_value.appendChild(td_item_state_value[i]);

            tbody.appendChild(tr_item);
            tbody.appendChild(tr_item_value);
            tbody.appendChild(tr_item_food);

            for (var j = 0; j < json[i].food_id.length; j++) {           //訂單內餐點的資訊
                var tr_food = document.createElement("tr");
                tr_food.style = "background:white;"
                var td_food_name = document.createElement("td");
                td_food_name.innerHTML = "<center>" + json[i].food_id[j].id;
                var td_food_amount = document.createElement("td");
                td_food_amount.innerHTML = "<center>" + json[i].food_id[j].amount;
                var td_food_state = document.createElement("td");
                td_food_state.innerHTML = "<center>123";
                tr_food.appendChild(td_food_name);
                tr_food.appendChild(td_food_amount);
                tr_food.appendChild(td_food_state);
                tbody.appendChild(tr_food);
            }

            var tr_divide = document.createElement("tr");               //分隔訂單
            var td1_divide = document.createElement("td");
            td1_divide.colSpan = "3";
            td1_divide.innerHTML = "<center>------------";
            tr_divide.appendChild(td1_divide);


            tbody.appendChild(tr_divide);
        }
        table.appendChild(tbody);
    }
    request.send(null);
}

function state(i) {
    var json = JSON.parse(request.response);
    if (json[i].state == 2)
        window.location.replace(`http://localhost:3000/state2?order_id=${json[i].order_id}`);
    else if (json[i].state == 3)
        window.location.replace(`http://localhost:3000/state3?order_id=${json[i].order_id}`);
}