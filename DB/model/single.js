<<<<<<< HEAD
const mongoose = require('mongoose');
var Schema = mongoose.Schema

var singleSchema = new Schema({
    food_name:{
        type: String
    },
    price:{
        type: Number
    },
    description: {
        type: String
    }
},{timestamps: true})


var single = mongoose.model('single',singleSchema)
=======
const mongoose = require('mongoose');
var Schema = mongoose.Schema

var singleSchema = new Schema({
    food_name:{
        type: String
    },
    price:{
        type: Number
    },
    description: {
        type: String
    }
},{timestamps: true})


var single = mongoose.model('single',singleSchema)
>>>>>>> origin/00757034
module.exports = single;