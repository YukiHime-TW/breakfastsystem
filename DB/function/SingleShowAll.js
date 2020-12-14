const Single = require('./model/single');
const mongoose = require('mongoose'); 

exports.singleshowall = function (name, price, introduce) {
    //console.log(name);
    console.log(price);
    Single.find({price: {$gte:0} }, function (err, docs) {  //條件:搜尋全部價錢>=0 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
        console.log("Find Successful");
    } 
});
};


/*Single.find({price: {$gte:0} }, function (err, docs) {  //條件:搜尋全部價錢>=0 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Result : ", docs); 
    } 
}); 
*/