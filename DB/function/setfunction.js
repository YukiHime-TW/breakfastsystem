const Set  = require('../models/set')
//create new set
exports.SetStore = function(name,price,description,food_id,set_id) {
   // console.log(name,age,gender,account,password);
    var new_set = new Set({
        set_name: name, 
        price:price,
        description: description,
       // food_id : food_id 
         $push: { food_id: food_id,set_id: set_id} 
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
/*
exports.SetInsertSingle = function (singleid) {
    console.log(singleid);
    //console.log(price);
    Set.food_id.push(singleid)
};
exports.SetDeleteSingle = function (singleid) {
    console.log(singleid);
    //console.log(price);
    Set.food_id.pop(singleid);
};
*/
exports.SetSearchByName = function (name,res) {
    console.log(name);
    Set.findOne({set_name: {$eq:name} }) 
    .then((response) =>{
    res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.SetSearchById = function (id,res) {
    console.log(id);
    Set.findById(id) 
    .then((response) =>{
    res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.SetDeleteById = function(id){
    Set.findByIdAndDelete(id) 
    .then(function(){ 
        console.log("Set deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};
exports.SetDeleteByName = function(name){
    Set.deleteOne({ set_name: { $eq: name } })
    .then(function(){ 
        console.log("Set deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};

exports.SetUpdateById = function(id,updateSet,res){
    Set.findByIdAndUpdate(id,{$set: updateSet})
    .then((response) =>{
        res.json(response)
        })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};


exports.SetShowall = function (res) {
    Set.find({}) 
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
