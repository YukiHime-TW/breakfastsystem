const Single = require('../model/single');
const mongoose = require('mongoose'); 

exports.singledeleteonebyname= function (name) {
    Single.findOneAndRemove({food_name: {$eq: name} } )
    .then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
}; 
exports.singlefindbyidandupdate = function (id, updateSingle,res) {

    Single.findByIdAndUpdate(id,{$set: updateSingle})
    .then(() =>{
        res.json({
            //message:'Single Update Successful'
        })
    })
    .catch(error =>{
        res.json({
           // message:'An Error Occured'
        })
    })
}; 
exports.singlefindone = function (name,res) {
    console.log(name);
    Single.findOne({food_name: {$eq:name} }) 
    .then(response =>{
        res.json({
            response,
            //message:'Single Search Successful'
        })
    })
    .catch(error =>{
        res.json({
            //message:'An Error Occured'
        })
    })
};

exports.singleshowall = function (res) {
    Single.find() 
    .then(response =>{
        res.json({
            response,
            //message:'Single ShowAll Successful'
        })
    })
    .catch(error =>{
        res.json({
          //  message:'An Error Occured'
        })
    })
};

exports.singlestore = function (name, price, introduce) {
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