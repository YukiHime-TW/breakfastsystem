const Cart = require('./model/cart');
const User = require('./model/user');
const mongoose = require('mongoose');

exports.insertsingle = function (singleid) {
    console.log(singleid);
    //console.log(price);
    Cart.food_id.push(singleid)
};
exports.deletesingle = function (singleid) {
    console.log(singleid);
    //console.log(price);
    Cart.food_id.pop(singleid);
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
    Cart.find(id) 
    .then(response =>{
        res.json({
            response,
            message:'Cart ShowAll Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
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



