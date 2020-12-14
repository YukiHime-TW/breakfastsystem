const Cart = require('./model/cart');
const User = require('./model/user');
const mongoose = require('mongoose');

exports.insertsingle = function (id) {
    console.log(id);
    //console.log(price);
    Cart.food_id.push(id)
};
exports.deletesingle = function (id) {
    console.log(id);
    //console.log(price);
    Cart.food_id.pop(id);
};

/*
exports.insertset = function (id) {
   
};
*/
/*
exports.deleteset = function (id) {
   
};
*/ 
exports.cartsearchbyuserid = function (id){ // 此ID為user的ObjID
    Cart.find(id, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("Result : ", docs); 
        } 
    }); 
};
//var arrayid = []
exports.cartstore = function (userid,foodarrayid/*,setarrayid*/) { // 接受並成為訂單
    var new_cart = new Cart({
        user_id = userid,
        $addToSet: {food_id:foodarrayid},
        state:'2'
    });
    new_cart.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            console.log("inserted");
        }
    });
};
/*
exports.cartclear = function () { // 清除

};
*/



