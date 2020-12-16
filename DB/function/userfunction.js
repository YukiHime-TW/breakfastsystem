const User  = require('./models/user')

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
exports.usersearchbyname = function (name,res) {
    console.log(name);
    User.findOne({food_name: {$eq:name} }) 
    .then(response =>{
        res.json({
            response,
            message:'User Search Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
};
exports.usersearchbyid = function (id,res) {
    console.log(id);
    User.findById(id)
    .then(response =>{
        res.json({
            response,
            message:'User Search Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
};
exports.userdeletebyid = function(id,res){
    User.findByIdAndDelete(id) 
    .then(() =>{
        res.json({
            message:'User Delete Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
};
exports.userdeletebyname = function(name){
    User.deleteOne({ user_name: { $eq: name } })
    .then(function(){ 
        console.log("User deleted"); // Success 
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    })
};

exports.userupdatebyid = function(id,updateUser,res){
    User.findByIdAndUpdate(id,{$set: updateUser})
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
    /*
    var updateSingle ={ // 要改的參數集合
        user_name :req.body.food_name,
        age : req.body.age,
        gender : req.body.gender,
        account: req.body.account,
        password: req.body.password
    }
    */ 
};


exports.usershowall = function (res) {
    User.find()
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
