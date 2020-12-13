const Cart = require('./model/cart');
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
//var arrayid = []
exports.cartstore = function (arrayid,/*,setarrayid*/err,result) { // 接受並成為訂單
    new_cart = new Cart({
        food_id: arrayid,
        state:'2'
    });
    if (err){
        console.log(err);
    }
    else{
        console.log("Result: " ,result);
    }
};
/*
exports.cartclear = function () { // 清除

};
*/



