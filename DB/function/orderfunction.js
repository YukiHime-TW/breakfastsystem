const Order = require('../model/order')
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
exports.ordersearchbyuserid = function (id,res){ // 此ID為user的ObjID
    Order.find({$and: [{user_id: id}, {state: 4}]})
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    });
};

exports.searchbyuserid_active = function (id,res){ // 此ID為user的ObjID
    // Order.find({$and:[{user_id: id},{state: {$or:[1, 2, 3]}}]})
    Order.find({$and:[{user_id: id}, $or [{state: 1}, {state: 2}, {state: 3}]]}) 
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    });
};

exports.makingordershowall = function (res){ // 此ID為user的ObjID
    Order.find({state: {$eq:2} }) 
    .then(response =>{
        res.json({
            response,
            message:'Making Order ShowAll Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
};





exports.orderstore = function (userid,foodarrayid/*,setarrayid*/) {
   var new_order = new Order({
    user_id:userid,
    $addToSet: {food_id:foodarrayid},
    state: 2
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