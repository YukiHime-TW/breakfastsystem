const Order = require('./model/order')
// 使用者參數: food_id[],set_id[],user_id[],state[],date
exports.insertsingle = function (id) {
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





exports.orderstore = function (foodarrayid/*,setarrayid*/,err,result) {
    new_order = new Order({
        food_id: foodarrayid,
        state: '1'
    });
    if (err){
        console.log(err);
    }
    else{
        console.log("Result: " ,result);
    }
};