const Single = require('./model/single');
const mongoose = require('mongoose'); 


  
// Find All document matching 
exports.findone = function (name, price) {
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
/*
    Single.findOne({food_name: {$eq:'小機掰'} }, function (err, docs) {  //條件:搜尋第一個符合名字 = 小機掰 的文件 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 
*/

