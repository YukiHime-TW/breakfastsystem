const mongoose = require('mongoose'); 
  
// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/breakfast', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}); 
  
// SingleSchema
const Single = mongoose.model('Single', {  //單點資料模型
    food_name: { type: String }, 
    price: { type: Number } ,
    description: { type: String } 
}); 
var new_food = new Single({ 
    food_name: '機掰', 
    price:34 ,
    description:'jijijij'
}) 
  
new_food.save(function(err,result){ 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        console.log(result) 
    } 
}) 