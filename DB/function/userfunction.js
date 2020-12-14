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
}
exports.usersearchbyname = function (name) {
    console.log(name);
    User.findOne({user_name: {$eq:name} }, function (err, docs) {   
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 
};
exports.usersearchbyid = function (id) {
    console.log(id);
    User.findById(id, function (err, docs) {   
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
});
};
exports.userdeletebyid = function(id){
    User.findByIdAndDelete(id, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
}
exports.userdeletebyname = function(name){
    User.findOneAndDelete(name, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
}
exports.userupdatebyname = function(name,updateUser){
    User.findOneAndUpdate({user_name: {$eq:name} },  
        {$set: updateUser}, null, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Original Doc : ",docs); 
        } 
    }); 
    exports.userupdatebyid = function(id,updateUser){
        User.findByIdAndUpdate(id,{$set: updateUser}, null, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Original Doc : ",docs); 
            }; 
        }); 

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
};

exports.usershowall = function () {
    Single.find(function (err, docs) {  
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
        console.log("Find Successful");
    } 
});
};
