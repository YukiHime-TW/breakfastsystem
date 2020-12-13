
const mongoose = require('mongoose'); 
const single = require('../model/single')
  
// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/breakfast', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}); 
  
// User model 
const single = mongoose.model('Single',singleSchema)
  
// Function call 
// Delete first document that matches 
// the condition i.e age >= 10 
User.deleteOne({ age: { $gte: 10 } }).then(function(){ 
    console.log("Data deleted"); // Success 
}).catch(function(error){ 
    console.log(error); // Failure 
}); 
