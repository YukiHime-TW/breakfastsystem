const Single = require('./model/single');
const mongoose = require('mongoose'); 

exports.findoneandupdate = function (origin,name, price, introduce) {
    console.log(name);
    console.log(price);
    Single.findOneAndUpdate({food_name: {$eq:'機掰'} },  //條件: 食物名字等於機掰
    {food_name:'小機掰'}, null, function (err, docs) {  // 更新成小機掰 價錢改成15元
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Original Doc : ",docs); 
    } 
}); 
}; 

/*
    Single.findOneAndUpdate({food_name: {$eq:'機掰'} },  //條件: 食物名字等於機掰
    {food_name:'小機掰'}, null, function (err, docs) {  // 更新成小機掰 價錢改成15元
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Original Doc : ",docs); 
    } 
}); 
}); 
*/ 