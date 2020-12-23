var request = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/YukiHime-TW/breakfastsystem/master/frontend/script/test.json";
function init() {
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