const Cart = require('../model/cart');
/*
exports.InsertSingle = function (id) {
    console.log(id);
    //console.log(price);
    Cart.food_id.id.push(id);
};
exports.DeleteSingle = function (id) {
    console.log(singleid);
    //console.log(price);
    Cart.food_id.id.pop(id);
};


exports.InSertset = function (setid) {
   console.log(setid);
    //console.log(price);
    Cart.set_id.id.pushs(setid);
};

exports.DeleteSet = function (setid) {
   console.log(setid);
    //console.log(price);
    Cart.set_id.id.push(setid);
};
*/
exports.CartSearchByUserId = function (id,res) { // 此ID為user的ObjID
    Cart.find(id)
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.CartUpdateState = function(cartid,state,res){ 
    Order.findByIdAndUpdate(cartid,{state:state})
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
}
//var arrayid = []

exports.CartUpdate = function (cartid,res,updateCart) { // 增刪完的購物車回存進資料庫
    Cart.findByIdAndUpdate(cartid,{$set: updateCart})
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.NewUserCartCreate = function (userid) { // 新使用者的新購物車
    var new_cart = new Cart({
        user_id : userid,
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




