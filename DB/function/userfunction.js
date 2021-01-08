const User  = require('../model/user')

exports.userstore = function(name,age,gender,account,password) {
    console.log(name,age,gender,account,password);
    var new_user = new User({
        user_name: name, 
        age: age,
        gender: gender,
        account: account,
        password: password
    })
    new_user.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            console.log("inserted");
        }
    });
};
exports.UserSearchByName = function (name,res) {
    console.log(name);
    User.findOne({user_name: {$eq:name} }) 
    .then((response) =>{
    res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};
exports.UserSearchById = function (id,res) {
    console.log(id);
    User.findById(id)
    .then((response) =>{
        res.json(response)
        })
        .catch(function(error){ 
            console.log(error); // Failure 
        }); 
};
exports.UserDeleteById = function(id){
    User.findByIdAndDelete(id) 
    .then(function(){ 
        console.log("User deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};
exports.UserDeleteByName = function(name){
    User.deleteOne({ user_name: { $eq: name } })
    .then(function(){ 
        console.log("User deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};

exports.UserUpdateById = function(id,updateUser,res){
    User.findByIdAndUpdate(id,{$set: updateUser})
    .then((response) =>{
        res.json(response)
        })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};


exports.UserShowAll = function (res) {
    User.find({}) 
    .then((response) =>{
        res.json(response)
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
};

