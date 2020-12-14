
const mongoose = require('mongoose'); 
  
// Database Connection 
mongoose.connect('mongodb://127.0.0.1:27017/breakfast',{ 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}); 
  
// User model 
var Single = mongoose.model('Single', { 
    food_name: { type: String }, 
    price: { type: Number } ,
    description: { type: String } 
}); 
Single.find({price: {$gte:0} }, function (err, docs) {  //條件:搜尋全部價錢>=0 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 

