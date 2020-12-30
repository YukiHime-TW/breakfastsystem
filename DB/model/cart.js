const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({

    user_id: {
        type: String
    },

    food_id:[{
        "id": String,
        "amount": Number
    }]
/*,
    set_id:[{
        type: String
    }]
*/
   ,
   state:[{
       type: Number // 接受:0,拒絕:1 初始:2
   }]
},{timestamps: true})
var cart = mongoose.model('cart',cartSchema)
module.exports = cart;
/*
{
    "user_id": "user_0001",
    "food_id": [],
    "set_id": []
}
*/ 