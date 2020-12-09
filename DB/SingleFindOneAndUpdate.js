const mongoose = require('mongoose'); 
  
// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/breakfast',{ 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
}); 
  
// SingleSchema
const Single = mongoose.model('Single', {  //單點資料模型
    food_name: { type: String }, 
    price: { type: Number } ,
    description: { type: String } 
}); 

Single.findOneAndUpdate({food_name: {$eq:'機掰'} },  //條件: 食物名字等於機掰
    {food_name:'小機掰'}, null, function (err, docs) {  // 更新成小機掰 價錢改成15元
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Original Doc : ",docs); 
    } 
}); 