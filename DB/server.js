const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./routes/singleroute')
var single  = require('./function/singlefunction.js')
var user  = require('./function/userfunction.js')
var order  = require('./function/orderfunction.js')
var cart = require('./function/cartfunction.js')




//var single = require('./model/single')

mongoose.connect('mongodb://localhost:27017/Breakfast', 
{useNewUrlParser: true, 
useCreateIndex: true, 
useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err) =>{
    console.log(err)
})

db.once('open',(db) => {
    console.log('data base connection established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
var name, price, description;

app.post('/insert', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    single.singlestore(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})


app.post('/delete', urlencodedParser, function (req, res) {
    name = req.body.Name;
    single.singledeleteonebyname(name);
    res.sendFile(__dirname + '/finish.html');
})


app.post('/update', urlencodedParser, function (req, res) {
    origin = req.body.Name
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    single.singlefindoneandupdate(origin, name, price, description);
    res.sendFile(__dirname + '/finish.html');
})


app.get('/',urlencodedParser, function (req, res) {
    price = req.body.Price;
    single.singleshowall(price);
    res.sendFile(__dirname + '/finish.html');

})


app.post('/searchone', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    single.singlefindone(name, price);
    res.sendFile(__dirname + '/finish.html');
})
 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)
