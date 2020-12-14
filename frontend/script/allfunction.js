var requestURL = "";
var reader = new FileReader();

function addmenu() {
    var menu = document.getElementById("menu");

    console.log("FUCK");

    reader.readAsText("./fuck.json");

    reader.onload = function(){
        console.log("Result: ",this.result);

        console.log("Turn into JSON: ");
        let json = JSON.parse(this.result);
        for(var i = 0;i<json.length;i++){
            console.log(json[i].proName);
        }
    }
    /*for (var i = 0; i <reader.length;i++){

    }*/
}

function jsonTest(){
    reader.readAsText(fuck.json);
}

/*function request() {
    var request = new XMLHttpRequest();

    request.open('GET', requestURL);

    request.responseType = 'json';

    request.send();

    request.onload = function () {
        var dishes = request.response;
    }
}*/