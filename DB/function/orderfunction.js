const Order = require('../model/order')
// 使用者參數: food_id[],set_id[],user_id[],state[],date
/*
exports.OrderInsertSingle = function (id) {
    console.log(id);
    //console.log(price);
    Order.food_id.push(id)
};
/*
exports.OrderDeleteSingle = function (id) {
    console.log(id);
    //console.log(price);
    Order.food_id.pop(id);
    
};
exports.OrderInsertSet = function (id) {
    console.log(id);
    //console.log(price);
    Order.food_id.push(id)
};
/*
exports.OrderDeleteSet = function (id) {
    console.log(id);
    //console.log(price);
    Order.food_id.pop(id);
    
};
*/
exports.OrderSearchByUserId = function (userid,res){ // 此ID為user的ObjID
    Order.find({user_id:userid}) 
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.OrderReturnUserID = function(orderid,res) {
    var OrderProjection = { 
        __v: false,
        _id: false,
        food_id:false,
        set_id: false,
        state: false
    };
    Order.findById(orderid,OrderProjection)
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    });  
};
exports.MakingOrderShowAll = function (userid,res){ // 此ID為user的ObjID
    Order.find({user_id:userid,state: {$eq:2} }) 
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.FindOrderWithDate = function(res,start,finish){ 
    Order.find({createdAt:{$gte: ISODate(start),$lt: ISODate(finish)}})
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
}
exports.OrderUpdateState = function(orderid,state,res){ 
    Order.findByIdAndUpdate(orderid,{state:state})
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
}

exports.OrderStore = function (userid,foodarrayid,setarrayid,price) {
   var new_order = new Order({
    user_id:userid,
    $push: {food_id:foodarrayid,set_id:setarrayid},
    state: 2,
    price:price
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