const Single = require('./model/single');
const mongoose = require('mongoose'); 

exports.deleteone= function (name) {
    Single.deleteOne({ food_name: { $eq:name } })
    .then(function(){  // 條件: food_name = name delete
        console.log("Data deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    });
}; 