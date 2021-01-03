const Cart = require('../model/cart');

exports.insertsingle = function (id) {
    console.log(id);
    //console.log(price);
    Cart.food_id.id.push(id);
};
exports.deletesingle = function (id) {
    console.log(singleid);
    //console.log(price);
    Cart.food_id.id.pop(id);
};


exports.insertset = function (setid) {
   console.log(setid);
    //console.log(price);
    Cart.food_id.id.pushse(setid);
};

exports.deleteset = function (setid) {
   console.log(setid);
    //console.log(price);
    Cart.food_id.id.push(setid);
};

exports.cartsearchbyuserid = function (id,res) { // 此ID為user的ObjID
    Cart.find(id)
        .then(response => {
            res.json({
                response,
                //message: 'Cart ShowAll Successful'
            })
        })
        .catch(error => {
            res.json({
                //message: 'An Error Occured'
            })
        });
};
//var arrayid = []

exports.cartupdate = function (cartid,res,updateCart) { // 增刪完的購物車回存
    Cart.findByIdAndUpdate(cartid,{$set: updateCart})
    .then(response => {
        res.json({
            response,
            //message: 'Cart ShowAll Successful'
        })
    })
    .catch(error => {
        res.json({
            //message: 'An Error Occured'
        })
    });
}
exports.newusercartcreate = function (userid) { // 新使用者的新購物車
    var new_cart = new Cart({
        user_id = userid,
        state: 2
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



