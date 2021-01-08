var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
var cart_url = "";
var div = new Array(0);
var image = new Array(0);
var something = false;

function init() {
  request.open("GET", url, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    let d = document.getElementById("main");
    var menu = document.createElement("div");
    menu.id = "menu";
    for (var i = 0; i < json.length; i++) {
      div[i] = document.createElement("div");
      image[i] = document.createElement("img");
      var foodName = document.createElement("div");
      image[i].src = `../image/plus.png`;
      image[i].style = "width: 100%";
      div[i].appendChild(image[i]);
      foodName.style = "width:100%; background-color:black; opacity:0.5; position:relative; word-wrap:break-word; color:white";
      foodName.innerHTML = "<center>" + json[i].food_name + "$" + json[i].price + "</center>";
      div[i].appendChild(foodName);
      div[i].setAttribute("food", json[i].food_name);
      if (i % 2 == 0) {
        div[i].style =
          "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 15%; margin-top: 20%;";
      } else {
        div[i].style =
          "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:right;margin-right: 15%; margin-top: 20%;";
      }
      div[i].id = json[i]._id;
      div[i].setAttribute("onclick", `addDish(${i})`);
      menu.appendChild(div[i]);
      initNum(i);
    }
    d.appendChild(menu);
  };
  request.send(null);
}

function menuInit() {
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
  document.getElementById("price").value = json[0].price * document.getElementById("num").value;
}

function plusDish(i){
  var temp = +localStorage.getItem(div[i].getAttribute("food")+" num");
  temp++;
  localStorage.setItem(div[i].getAttribute("food")+" num",temp);
}

function minusDish(i){
  var temp = +localStorage.getItem(div[i].getAttribute("food")+" num");
  if(temp-- == 0){
    temp = 1;
  }else{
    temp--;
  }
  localStorage.setItem(div[i].getAttribute("food")+" num",temp);
}

function initNum(i) {
  if (localStorage.getItem(div[i].getAttribute("food")) != null) {
    div[i].setAttribute("num", localStorage.getItem(div[i].getAttribute("food")));
  } else {
    div[i].setAttribute("num", 0);
  }
}

function addDish(i) {
  var cart = document.getElementById("cart");
  var putIn = document.createElement("input");
  var temp = +div[i].getAttribute("num");
  ++temp;
  localStorage.setItem(div[i].getAttribute("food"), temp);
  localStorage.setItem(div[i].getAttribute("food") + " id", div[i].id);
  div[i].setAttribute("num", temp);
  putIn.type = "hidden";
  putIn.value = div[i].id;
  putIn.id = div[i].getAttribute("food");
  putIn.name = "Cart";
  cart.appendChild(putIn);
  document.getElementById(div[i].id).setAttribute("onclick", `addAlreadyDish(${i})`);
}

function addAlreadyDish(i) {
  var cart = document.getElementById("cart");
  var alreadyDish = document.getElementById(`div[${i}].food_name`);
  var temp = +div[i].getAttribute("num");
  ++temp;
  localStorage.setItem(div[i].getAttribute("food"), temp);
  div[i].setAttribute("num", temp);
  if (alreadyDish != null) {
    var putIn = document.createElement("input");
    putIn.type = "hidden";
    putIn.value = div[i].id;
    putIn.id = div[i].getAttribute("food");
    putIn.name = "Cart";
    cart.appendChild(putIn);
  }
}

function clearAll() {
  localStorage.clear();
  var json = JSON.parse(request.response);
  for (var i = 0; i < json.length; i++) {
    div[i].num = 0;
  }
}

function cartInit() {

  something = false;

  if (localStorage.length != 0) {
    something = true;
  }

  if (something) {
    ifSomething();
  } else {
    ifNothing();
  }

}

function ifSomething() {
  var d = document.getElementById("main");
  var form = document.createElement("form");
  form.id = "finalCart";
  form.action = "/send_cart";
  form.method = "POST";
  var table = document.createElement("table");
  table.className = "table table-striped";
  form.appendChild(table);
  d.appendChild(form);

  var thead = document.createElement("thead");
  table.appendChild(thead);

  var tr = document.createElement("tr");
  thead.appendChild(tr);

  var th_name = document.createElement("th");
  th_name.scope = "col";
  th_name.innerText = "餐點名稱";
  tr.appendChild(th_name);

  var th_number = document.createElement("th");
  th_number.scope = "col";
  th_number.innerText = "數量";
  tr.appendChild(th_number);

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  var cartLength = 0;

  var j = 1;

  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).charAt(localStorage.key(i).length - 1) != "d") {
      cartLength++;
    }
  }

  for (var i = 0; i < localStorage.length; i++) {

    if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
      continue;
    }

    var tr_food = document.createElement("tr");
    var td_food_name = document.createElement("td");
    var input_food_name = document.createElement("input");

    td_food_name.innerText = localStorage.key(i);
    input_food_name.hidden = true;
    input_food_name.value = localStorage.getItem(localStorage.key(i) + " id");
    input_food_name.name = `cart[id]`;
    td_food_name.appendChild(input_food_name);


    var td_food_number = document.createElement("td");
    var input_food_number = document.createElement("input");

    td_food_number.innerText = localStorage.getItem(localStorage.key(i));
    input_food_number.hidden = true;
    input_food_number.value = localStorage.getItem(localStorage.key(i));
    input_food_number.name = `cart[num]`;
    td_food_number.appendChild(input_food_number);

    tr_food.appendChild(td_food_name);
    tr_food.appendChild(td_food_number);
    tbody.appendChild(tr_food);
    j++;
  }
}

function ifNothing() {
  var p = document.createElement("p");
  p.innerText = "購物車裡沒有東西";
  document.getElementById("main").appendChild(p);
}

function sendingFinalCart() {
  var cart = document.getElementById("finalCart");
  localStorage.clear();
  cart.submit();
  console.log("Order send");
}

function orderInit() {
  request.open("GET", url, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    console.log(json);
    var d = document.getElementById("main");
    var table = document.createElement("table");
    table.className = "table table-striped";
    d.appendChild(table);

    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    thead.appendChild(tr);

    var th_name = document.createElement("th");
    th_name.scope = "col";
    th_name.innerText = "餐點名稱";
    tr.appendChild(th_name);

    var th_number = document.createElement("th");
    th_number.scope = "col";
    th_number.innerText = "數量";
    tr.appendChild(th_number);

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (var i = 0; i < json.length; i++) {
      var tr_food = document.createElement("tr");
      var td_food_name = document.createElement("td");
      td_food_name.innerText = json[i].food_name;
      var td_food_number = document.createElement("td");
      td_food_number.innerText = json[i].food_num;
      tr_food.appendChild(td_food_name);
      tr_food.appendChild(td_food_number);
      tbody.appendChild(tr_food);
    }
  }
  request.send(null);
}
