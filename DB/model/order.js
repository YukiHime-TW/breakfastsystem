const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    
    
    food_id:[{
        type: String // singleObjectID
    }],
    /*
    set_id: [{
        type: String // setObjectID
    }],
    */
    state:[{
        type: String  // 送出:1 製作中:2 待領取 :3 已領取: 4
    }]
},{timestamps: true})

var order = mongoose.model('order',orderSchema)
module.exports = order;




/*
{
    "order_id": "order_001",
    "date": "ISODate",
    "state": "state",
    "food_id": [],
    "set_id": [],
    "arrive_time": "ISODate"
}
*/