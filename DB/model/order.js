const mongoose = require('mongoose');
const Schema = mongoose.Schema
const singleSchema = new Schema({
    
    set_name:{
        type: String
    },
    price:{
        type: Number
    },
    description: {
        type: String
    ,
    food_id:{

    }    
    }

},{timestamps: true})


{
    "order_id": "order_001",
    "date": "ISODate",
    "state": "state",
    "food_id": [],
    "set_id": [],
    "arrive_time": "ISODate"
}