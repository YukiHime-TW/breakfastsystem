var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
var newDiv = document.createElement("div");
var newImg = document.createElement("img");
function init() {
  request.open("GET", url, true);
  request.onload = function () {
    var json = JSON.parse(request.response);
    let d = document.getElementById("main");
    var menu = document.createElement("div");
    menu.id = "menu";
    for (var i = 0; i < json.length; i++) {

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
      newDiv.setAttribute("onclick", "localStorage.setItem('cartKey', newDiv.id)");
      menu.appendChild(newDiv);
    }
    d.appendChild(menu);
    console.log(json);
  };
  request.send(null);
}
