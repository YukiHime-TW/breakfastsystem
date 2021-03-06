const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    order_num: Number,
    user_id: {
        type: String
    },
    food_id:[{
        "id": String,
        "name": String, 
        "amount": Number,
        "finished": Boolean
    }],
    set_id: [{
        "id": String,
        "name": String,
        "amount": Number,
        "finished": Boolean
    }],
    state: Number,  // 送出:1 製作中:2 待領取(已完成) :3 已領取: 4
    price:{
        type: Number
    },
    pickupTime: Date
},{timestamps: true}) // default timestamp format : CreatedAt UpdatedAt

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