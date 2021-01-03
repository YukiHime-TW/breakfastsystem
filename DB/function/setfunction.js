const Set  = require('../models/set')
//create new set
exports.setstore = function(name,price,description,food_id) {
   // console.log(name,age,gender,account,password);
    var new_set = new Set({
        set_name: name, 
        price:price,
        description: description,
        food_id : food_id
    })
    new_set.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            console.log("inserted");
        }
    });
};
exports.insertsingle = function (singleid) {
    console.log(singleid);
    //console.log(price);
    Set.food_id.push(singleid)
};
exports.deletesingle = function (singleid) {
    console.log(singleid);
    //console.log(price);
    Set.food_id.pop(singleid);
};
exports.setsearchbyname = function (name,res) {
    console.log(name);
    User.findOne({food_name: {$eq:name} }) 
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
        res.json({
            //message:'An Error Occured'
        })
    })
};
exports.setsearchbyid = function (id,res) {
    console.log(id);
    Set.findById(id)
    .then(response =>{
        res.json({
            response,
            //message:'User Search Successful'
        })
    })
    .catch(error =>{
        res.json({
            //message:'An Error Occured'

        })
    })
};
exports.setdeletebyid = function(id){
    Set.findByIdAndDelete(id) 
    .then(function(){ 
        console.log("Set deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};
exports.setdeletebyname = function(name){
    Set.deleteOne({ user_name: { $eq: name } })
    .then(function(){ 
        console.log("User deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};

exports.setupdatebyid = function(id,updateSet,res){
    Set.findByIdAndUpdate(id,{$set: updateSet})
    .then(() =>{
        res.json({
            message:'User Update Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
};


exports.setshowall = function (res) {
    Set.find()
    .then(response =>{
      res.json({
              response,
              message:'User ShowAll Successful'
            })  
    })
    .catch(error =>{
        res.json({
            message:'An  Error Occured'
        })
    })
};
