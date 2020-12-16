const mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
    user_name:{
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    account: {
        type: String
    },
    password: {
        type: String
    }
},{timestamps: true})


var user = mongoose.model('user',userSchema)
module.exports = user;




/*
{
    "user_id": "user_0001",
    "user_name": "小明",
    "age": 12,
    "gender": "male",
    "account": "xiaoming",
    "password": "qwerty"
}
*/