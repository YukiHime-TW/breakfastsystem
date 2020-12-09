var express=require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
const { insertMany } = require('c:/users/exriesz/documents/編輯菜單(單點)/model/single');
function render(filename, params) {
  var data = fs.readFileSync(filename, 'utf8');
  for (var key in params) {
    data = data.replace('{' + key + '}', params[key]);
  }
  return data;
}
const app=express();
const port=3000;
var name;
var price;
var introduce;
app.post('/test',urlencodedParser,function(req,res){
    name=req.body.Name;
    price=req.body.Price;
    introduce=req.body.Introduce;
    res.send(name+" "+price+" "+introduce);
    console.log(name);
    console.log(price);
    console.log(introduce);
    Response.Write("<script>window.opener=null;window.close()</script>");
})

app.listen(port,()=>{
    console.log(`server listen to http://localhost:${port}`)
})