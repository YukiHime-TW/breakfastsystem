
const mongoose = require('mongoose'); 
  
// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/breakfast', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}); 
  
// SingleSchema
const Single = mongoose.model('Single', { //單點資料模型
    food_name: { type: String }, 
    price: { type: Number } ,
    description: { type: String } 
}); 
  
// Find All document matching 
Single.findOne({food_name: {$eq:'小機掰'} }, function (err, docs) {  //條件:搜尋第一個符合價錢>=0的文件 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 
