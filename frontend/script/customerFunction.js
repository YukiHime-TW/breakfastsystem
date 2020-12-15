var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";

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
            newDiv.textContent = json[i]._id + json[i].food_name + json[i].price + json[i].description;
            menu.appendChild(newDiv);
        }
        d.appendChild(menu);
        console.log(json);
    }
    request.send(null);
}
