var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
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
      div[i].setAttribute("onclick", `addDish(${i})`);
      menu.appendChild(div[i]);
    }
    d.appendChild(menu);
    console.log(json);
  };
  request.send(null);
}

function addDish(i){
  localStorage.setItem('cartKey' + i, div[i].id);
}
