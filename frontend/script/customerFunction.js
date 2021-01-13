var request = new XMLHttpRequest();
var requestSet = new XMLHttpRequest();
var urlDish = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
var urlSettest = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/testSet.json";
var urlSet = "https://hidden-garden-96019.herokuapp.com/get_set";
var div = new Array(0);
var image = new Array(0);
var descri = new Array(0);
var something = false;
var dishLong = 0;

function init() {
  let d = document.getElementById("main");
  var menu = document.createElement("div");
  request.open("GET", urlDish, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    dishLong = json.length;
    menu.id = "menu";
    for (var i = 0; i < json.length; i++) {
      descri[i] = json[i].description;
      div[i] = document.createElement("div");
      image[i] = document.createElement("img");
      var foodName = document.createElement("div");
      image[i].src = `../image/plus.png`;
      image[i].style = "width: 100%";
      div[i].appendChild(image[i]);
      foodName.style =
        "width:100%; background-color:black; opacity:0.5; position:relative; word-wrap:break-word; color:white";
      foodName.innerHTML =
        "<center>" + json[i].food_name + "$" + json[i].price + "</center>";
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
      div[i].setAttribute("onclick", `showDes(${i})`);
      div[i].setAttribute("unclick", `recover(${i})`);
      menu.appendChild(div[i]);
      initNum(i);
    }
    d.appendChild(menu);
  };
  request.send(null);

  requestSet.open("GET", urlSettest, true);
  requestSet.onload = function () {
    var set = JSON.parse(requestSet.response);
    for (var i = dishLong, j = 0; i < set.length + dishLong; i++, j++) {
      descri[i] = set[j].description;
      div[i] = document.createElement("div");
      image[i] = document.createElement("img");
      var foodName = document.createElement("div");
      image[i].src = `../image/plus.png`;
      image[i].style = "width: 100%";
      div[i].appendChild(image[i]);
      foodName.style =
        "width:100%; background-color:black; opacity:0.5; position:relative; word-wrap:break-word; color:white";
      foodName.innerHTML =
        "<center>" + set[i - dishLong].set_name + "$" + set[i - dishLong].price + "</center>";
      div[i].appendChild(foodName);
      div[i].setAttribute("food", set[i - dishLong].set_name);
      if (i % 2 == 0) {
        div[i].style =
          "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 15%; margin-top: 20%;";
      } else {
        div[i].style =
          "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:right;margin-right: 15%; margin-top: 20%;";
      }
      div[i].id = set[i - dishLong]._id;
      div[i].setAttribute("onclick", `showDes(${i})`);
      div[i].setAttribute("unclick", `recover(${i})`);
      menu.appendChild(div[i]);
      initNum(i);
    }
  };
  requestSet.send(null);
}

function plusDish(i) {
  var temp = +localStorage.getItem(localStorage.key(i));
  temp++;
  localStorage.setItem(localStorage.key(i), temp);
  window.location.reload();
}

function minusDish(i) {
  var temp = +localStorage.getItem(localStorage.key(i));
  if (temp == 1) {
    temp = 1;
  } else {
    temp--;
  }
  localStorage.setItem(localStorage.key(i), temp);
  window.location.reload();
}

function initNum(i) {
  if (localStorage.getItem(div[i].getAttribute("food")) != null) {
    div[i].setAttribute(
      "num",
      localStorage.getItem(div[i].getAttribute("food"))
    );
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
  document
    .getElementById(div[i].id)
    .setAttribute("onclick", `addAlreadyDish(${i})`);
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

function showDes(i) {
  image[i].style = "opacity:0.2;background-color : black;width: 100%";
  var des = document.createElement("span");
  des.innerText = descri[i];
  des.style = "position: absolute;margin-bottom: 0;margin-top:-100px";
  des.id = div[i].id + "des";
  div[i].appendChild(des);
  document.getElementById(div[i].id).setAttribute("onclick", `addDish(${i})`);
  window.setTimeout(`recover(${i})`, 2000);
}

function recover(i) {
  image[i].style = "width: 100%";
  div[i].removeChild(document.getElementById(div[i].id + "des"));
  document.getElementById(div[i].id).setAttribute("onclick", `showDes(${i})`);
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
    ifSomething(true);
  } else {
    ifNothing(true);
  }
}

function ifSomething(flag) {
  if (flag) {
    var d = document.getElementById("main");
    var form = document.createElement("form");
    form.id = "finalCart";
    form.action = "/send_cart";
    form.method = "POST";
    var table = document.createElement("table");
    table.style = "margin-top:13%";
    table.className = "table table-striped";
    table.id = "table";
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
    tbody.style = "center = true;";
    table.appendChild(tbody);

    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
        continue;
      }

      var plusButton = document.createElement("input");
      var minusButton = document.createElement("input");
      plusButton.type = "button";
      minusButton.type = "button";
      plusButton.setAttribute("onclick", `plusDish(${i})`);
      minusButton.setAttribute("onclick", `minusDish(${i})`);
      plusButton.value = "+";
      minusButton.value = "-";

      var tr_food = document.createElement("tr");
      tr_food.id = `${i}`;
      var td_food_name = document.createElement("td");
      var input_food_name = document.createElement("input");
      var input_name = document.createElement("input");

      td_food_name.innerText = localStorage.key(i);
      input_food_name.hidden = true;
      input_food_name.value = localStorage.getItem(localStorage.key(i) + " id");
      input_food_name.name = `cart[id]`;
      input_name.value = localStorage.key(i);
      input_name.name = `cart[num]`;
      input_name.hidden = true;
      td_food_name.appendChild(input_food_name);

      var td_food_number = document.createElement("td");
      var input_food_number = document.createElement("input");

      td_food_number.innerText = localStorage.getItem(localStorage.key(i));
      input_food_number.hidden = true;
      input_food_number.value = localStorage.getItem(localStorage.key(i));
      input_food_number.name = `cart[num]`;
      td_food_number.appendChild(plusButton);
      td_food_number.appendChild(input_food_number);
      td_food_number.appendChild(minusButton);

      tr_food.appendChild(td_food_name);
      tr_food.appendChild(td_food_number);
      tbody.appendChild(tr_food);
    }
    calCost(d, true);
  } else {
    var d = document.getElementById("main");
    var form = document.createElement("form");
    form.id = "finalCart";
    form.action = "/send_cart";
    form.method = "POST";
    var table = document.createElement("table");
    table.className = "table table-striped";
    table.id = "table";
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
    tbody.style = "center = true;";
    table.appendChild(tbody);

    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
        continue;
      }

      var tr_food = document.createElement("tr");
      tr_food.id = `${i}`;
      var td_food_name = document.createElement("td");
      var input_food_name = document.createElement("input");
      var input_name = document.createElement("input");

      td_food_name.innerText = localStorage.key(i);
      input_food_name.hidden = true;
      input_food_name.value = localStorage.getItem(localStorage.key(i) + " id");
      input_food_name.name = `cart[id]`;
      input_name.value = localStorage.key(i);
      input_name.name = `cart[num]`;
      input_name.hidden = true;
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
    }
    calCost(d, false);
  }

}

function calCost(d, flag) {
  var lastCost = 0;
  parseInt(lastCost);
  var footer = document.createElement("footer");
  footer.style = "position: absolute;bottom: 0px; width: 100%;";
  var readyAt = document.createElement("p");
  readyAt.className = "h3";
  readyAt.innerText = "Ready at:";
  footer.appendChild(readyAt);
  var hr = document.createElement("hr");
  footer.appendChild(hr);
  var cost = document.createElement("p");
  cost.className = "h3";
  request.open("GET", urlDish, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
        continue;
      }
      for (var j = 0; j < json.length; j++) {
        if (localStorage.key(i) == json[j].food_name) {
          lastCost += parseInt(json[j].price * localStorage.getItem(localStorage.key(i)), 10);
        }
      }
    }
  };

  requestSet.open("GET", urlSettest, true);
  requestSet.onload = function () {
    var json = JSON.parse(requestSet.response);
    console.log(json);
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(localStorage.key(i).length - 1) == "d") {
        continue;
      }
      for (var j = 0; j < json.length; j++) {
        if (localStorage.key(i) == json[j].set_name) {
          lastCost += parseInt(json[j].price * localStorage.getItem(localStorage.key(i)), 10);
        }
      }
    }
    cost.innerText = `Cost: ${lastCost}元`;
  };
  
  footer.appendChild(cost);
  if (flag) {
    var send = document.createElement("input");
    send.className = "btn btn-warning";
    send.value = "送出";
    send.type = "button";
    send.style = "position: absolute;bottom: 0px;right: 0px;";
    send.setAttribute("onclick", "sendingFinalCart()");
    footer.appendChild(send);
    var cancel = document.createElement("button");
    cancel.className = "btn btn-warning";
    cancel.innerText = "取消";
    cancel.type = "button";
    cancel.style = "position: absolute;bottom: 0px;right: 100px;";
    cancel.setAttribute("onclick", "window.location='menu.html'");
    footer.appendChild(cancel);
  } else {
    var cancel = document.createElement("button");
    cancel.className = "btn btn-warning";
    cancel.innerText = "返回";
    cancel.type = "button";
    cancel.style = "position: absolute;bottom: 0px;right: 0px;";
    cancel.setAttribute("onclick", "window.location='menu.html'");
    footer.appendChild(cancel);
  }

  d.appendChild(footer);
  request.send(null);
  requestSet.send(null);
}

function ifNothing(flag) {
  if (flag) {
    var p = document.createElement("p");
    p.innerText = "購物車裡沒有東西";
    p.style = "margin-top: 75%";
    var center = document.createElement("center");
    center.appendChild(p);
    document.getElementById("main").appendChild(center);
  } else {
    var p = document.createElement("p");
    p.innerText = "尚未訂餐";
    p.style = "margin-top: 75%";
    var center = document.createElement("center");
    center.appendChild(p);
    document.getElementById("main").appendChild(center);
  }
}

function sendingFinalCart() {
  var cart = document.getElementById("finalCart");
  localStorage.clear();
  cart.submit();
  console.log("Order send");
}

function orderInit() {
  something = false;

  if (localStorage.length != 0) {
    something = true;
  }

  if (something) {
    ifSomething(false);
  } else {
    ifNothing(false);
  }
}
