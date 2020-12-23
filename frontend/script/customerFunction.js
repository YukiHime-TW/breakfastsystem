var request = new XMLHttpRequest();
var url =
  "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
var div = new Array(0);
var image = new Array(0);

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
      div[i].id = json[i]._id;
      div[i].num = 0;
      div[i].setAttribute("onclick", `addDish(${i})`);
      menu.appendChild(div[i]);
    }
    d.appendChild(menu);
    console.log(json);
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
  var price = document.getElementById("price").value;
  document.getElementById("price").value = json[0].price * document.getElementById("num").value;
}

function addDish(i) {
  var json = JSON.parse(request.response);
  var cart = document.getElementById("cart");
  var alreadyDish = document.getElementById(`div[${i}].food_name`);
  if (alreadyDish == null) {
  } else {
    var putIn = document.createElement("input"); putIn.type = "hidden";
    putIn.value = div[i].id;
    putIn.id = json[i].food_name;
    putIn.name = "Cart";
    cart.appendChild(putIn);
  }
}

function minusDish(i) {
  var json = JSON.parse(request.response);
  div[i].num--;
  localStorage.setItem("cartKey" + i + "num", div[i].num);
  var cart = document.getElementById("cart");
  cart.removeChild(document.getElementById(json[i].food_name));
}

function clearAll() {
  localStorage.clear();
  var json = JSON.parse(request.response);
  for (var i = 0; i < json.length; i++) {
    div[i].num = 0;
  }
}
