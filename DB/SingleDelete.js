const mongoose = require('mongoose'); 
  
// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/breakfast', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}); 
  
// SingleSchema
var Single = mongoose.model('Single', {  //單點資料模型
    food_name: { type: String }, 
    price: { type: Number } ,
    description: { type: String } 
}); 
exports.deleteone= function (name) {
    Single.deleteOne({ food_name: { $eq:name } }).then(function(){  // 條件: food_name = 機掰 刪除
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    });
}; 