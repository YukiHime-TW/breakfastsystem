const mongoose = require('mongoose');
const Schema = mongoose.Schema

const singleSchema = new Schema({
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


const single = mongoose.model('Single',singleSchema)
module.exports = single;