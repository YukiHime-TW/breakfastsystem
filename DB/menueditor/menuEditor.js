const { json } = require('body-parser')
const Single = require('../model/single')
//const Set = require('../model/set')

// 
// 顯示所有Document 測試結果: 成功
const SingleShowAll =(req,res,next) =>{
    Single.find()
    .then(response =>{
      res.json({
              response,
              message:'Single ShowList Successful'
            })  
    })
    .catch(error =>{
        res.json({
            message:'An  Error Occured'
        })
    })
}

// 搜尋單一個單點

const SingleSearch  = (req, res, next) =>{
    //以名字作為搜尋條件查詢單點 測試結果: 成功
    var food_name  = req.body.food_name
    Single.findOne({ food_name: { $eq: food_name } })
    .then(response =>{
        res.json({
            response,
            message:'Single Search Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
   /* 利用ObjectID搜尋 測試結果 : 成功
    let id = req.body.id
    Single.findById(id)
    .then(response =>{
        res.json({
            response,
            message:'Single Search Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
    */
}
// 儲存單點 測試結果 :成功
const SingleStore = (req, res, next) =>{
     let single = new Single({

        food_name : req.body.food_name,

        price : req.body.price,

        description : req.body.description

     })
     single.save()
     .then(response =>{
         res.json({
             message:'Single Add Successful'
         })
     })
     .catch(error =>{
         res.json({
             message:'An  Error Occured'
         })
     })
}
const SingleUpdate = (req, res, next) =>{
// 以ObjectID更新單點 測試結果: 成功 
    let id = req.body.id
    let updateSingle ={
        food_name :req.body.food_name,
        price : req.body.price,
        description : req.body.description
    }
    
  
    Single.findByIdAndUpdate(id,{$set: updateSingle})
    .then(() =>{
        res.json({
            message:'Single Update Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
    /*// var food_name = req.body.food_name
    以名字作為搜尋條件更新單點 測試結果: 失敗 
    Single.findOneAndUpdate({food_name: {$eq:food_name} },  
        {$set:updateSingle}, null)
        .then(() =>{
            res.json({
                message:'Single Update Successful'
            })
        })
        .catch(error =>{
            res.json({
                message:'An Error Occured'
            })
        })
    */
}

const SingleDelete = (req, res, next) =>{
    //以ObjectID刪除單點 測試結果: 成功
    /*
     let id = req.body.id
    Single.findByIdAndDelete(id) 
    .then(() =>{
        res.json({
            message:'Single Delete Successful'
        })
    })
    .catch(error =>{
        res.json({
            message:'An Error Occured'
        })
    })
    */
   //以名字作為搜尋條件刪除單點 測試結果: 成功
   var food_name  = req.body.food_name
   Single.deleteOne({ food_name: { $eq: food_name } }).then(function(){ 
    console.log("Data deleted"); // Success 
}).catch(function(error){ 
    console.log(error); // Failure 
}); 
} 
/*未完成
const SetShowAll = (req, res, next) =>{
    Set.find()
}
*/

module.exports = {
    SingleSearch,SingleShowAll,SingleUpdate,SingleStore,SingleDelete
}