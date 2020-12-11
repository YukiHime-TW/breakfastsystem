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

