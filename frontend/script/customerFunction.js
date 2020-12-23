var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
var keyString,keyNum;

window.onload = init();

function init() {
  request.open("GET", url, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    let d = document.getElementById("main");
    var menu = document.createElement("div");
    menu.id = "menu";
    for (var i = 0; i <= json.length-1; i++) {
      var newDiv = document.createElement("div");
      var newButton = document.createElement("button");
      var newImg = document.createElement("img");
      keyString = String(i);
      keyNum = i;
      newImg.src = "../image/plus.png";
      newImg.style = "width: 100%";
      newButton.setAttribute("onclick",setLocal());
      newButton.appendChild(newImg);
      newDiv.appendChild(newButton);
      if (i % 2 == 0) {
        newDiv.style =
          "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:left;margin-left: 15%; margin-top: 20%;";
      } else {
        newDiv.style =
          "width: 25%; border-width:3px;border-style:solid;border-color:black;padding:5px; float:right;margin-right: 15%; margin-top: 20%;";
      }
      newDiv.id = json[i]._id;
      newDiv.setAttribute("key",i);
      menu.appendChild(newDiv);
    }
    d.appendChild(menu);
    console.log(json);
  };
  request.send(null);
}

function setLocal(){
  var json = JSON.parse(request.response);
  localStorage.setItem("cart" + keyString,json[keyNum]._id);
}