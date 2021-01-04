const Single = require('../model/single');
const mongoose = require('mongoose'); 

exports.SingleDelete= function (name) {
    Single.deleteOne({food_name: {$eq: name} } )
    .then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
}; 
exports.SingleUpdate = function (id, updateSingle,res) {
    Single.findByIdAndUpdate(id,{$set: updateSingle})
    .then((response) =>{
        res.json(response)
        })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
    
}; 
exports.SingleSearch = function (name,res) {
    console.log(name);
    Single.findOne({food_name: {$eq:name} }) 
    .then((response) =>{
    res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};

exports.SingleShowAll = function (res) {
    Single.find({}) 
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};

exports.SingleStore = function (name, price, description) {
    console.log(name);
    console.log(price);
    var new_food = new Single({
        food_name: name,
        price: price,
        description: description
    })
  
    new_food.save(function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
            console.log("inserted");
        }
    })
};