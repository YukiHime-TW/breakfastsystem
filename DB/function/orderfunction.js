const Order = require('./model/order')
// 使用者參數: food_id[],set_id[],user_id[],state[],date
exports.orderinsertsingle = function (id) {
    console.log(id);
    //console.log(price);
    Order.food_id.push(id)
};
/*
exports.deletesingle = function (id) {
    console.log(id);
    //console.log(price);
    Order.food_id.pop(id);
};
*/
exports.ordersearchbyuserid = function (id){ // 此ID為user的ObjID
    Cart.find(id, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("Result : ", docs); 
        } 
    }); 
};




exports.orderstore = function (userid,foodarrayid/*,setarrayid*/) {
   var new_order = new Order({
    user_id:userid,
    $addToSet: {food_id:foodarrayid},
    state: '1'
    });

   new_order.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            console.log("inserted");
        }
    });
};