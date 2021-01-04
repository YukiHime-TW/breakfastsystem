const Cart = require('../model/cart');

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
            res.json(response)
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured'
            })
        });
};
//var arrayid = []

exports.cartSearchByAccount = function (id, res) {  // 用Account搜尋，因為session存的是Account
    Cart.find({user_id: id})
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured'
            })
        })
}

exports.cartupdate = function (cartid,res) { // 增刪完的購物車回存
    Cart.findByIdAndUpdate(cartid)
    .then(response => {
        res.json({
            response,
            message: 'Cart ShowAll Successful'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    });
}
exports.newusercartcreate = function (userid) { // 新使用者的新購物車
    var new_cart = new Cart({
        user_id: userid,
        state: 2
    });
    new_cart.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            console.log("Created new cart for new user.");
        }
    });
};

/*
exports.cartclear = function () { // 清除
};
*/