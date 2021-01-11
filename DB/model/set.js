const mongoose = require('mongoose');
const Schema = mongoose.Schema
const setSchema = new Schema({
    
    set_name:{
        type: String
    },
    price:{
        type: Number
    },
    description: {
        type: String
    },
    food_id: [ Number ]

},{timestamps: true})

var set = mongoose.model('set',setSchema)
module.exports = set;