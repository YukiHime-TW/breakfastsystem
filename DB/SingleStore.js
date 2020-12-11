const Single = require('./model/single');
const mongoose = require('mongoose'); 

exports.insertone = function (name, price, introduce) {
    console.log(name);
    console.log(price);
    var new_food = new Single({
        food_name: name,
        price: price,
        description: introduce
    })
  
    new_food.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            console.log("inserted");
        }
    })
};