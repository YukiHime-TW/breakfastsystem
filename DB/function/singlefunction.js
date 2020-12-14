const Single = require('./model/single');
const mongoose = require('mongoose'); 

exports.singledeleteonebyname= function (name) {
    Single.findOneAndRemove({food_name: {$eq: name} }, function (err, docs) { 
    if (err){ 
    console.log(err) 
    } 
    else{ 
    console.log("Deleted : ", docs); 
    } 
    }); 
}; 
exports.singlefindoneandupdate = function (name, price, introduce) {
    console.log(name);
    console.log(price);
    Single.findOneAndUpdate({food_name: {$eq:name} },  //條件: food_name equal to name
    {price:price}, null, function (err, docs) {  // price change to price
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Original Doc : ",docs); 
    } 
}); 
}; 
exports.singlefindone = function (name, price) {
    console.log(name);
    console.log(price);
    Single.findOne({food_name: {$eq:name} }, function (err, docs) {  //條件:搜尋第一個符合名字 = 小機掰 的文件 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 
};

exports.singleshowall = function (name, price, introduce) {
    //console.log(name);
    console.log(price);
    Single.find({price: {$gte:0} }, function (err, docs) {  //條件:搜尋全部價錢>=0 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
        console.log("Find Successful");
    } 
});
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