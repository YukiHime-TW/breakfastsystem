const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./DB/routes/singleroute')
// var insert  = require('./DB/SingleStore.js')
var single = require('./DB/function/singlefunction.js')
var order = require('./DB/function/orderfunction.js')
var cart = require('./DB/function/cartfunction.js')
var singleCollection = require('./DB/model/single')
// mongoose.connect('mongodb://localhost:27017/Breakfast', 
// {useNewUrlParser: true, 
// useCreateIndex: true, 
// useUnifiedTopology: true})
mongoose.connect('mongodb+srv://admin:00757019@breakfastsystem.pcfwe.mongodb.net/breakfastSystem?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

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

app.use(express.static('frontend'))
app.use(express.static('frontend/html'));

// html
// app.get('/editmenu.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/editmenu.html');
// })

// app.get('/editmenuplus.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/editmenuplus.html');
// })

// app.get('/manage.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/manage.html');
// })

// app.get('/index.html', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// })

// app.get('/cart.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/cart.html');
// })

// app.get('/makingorder.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/makingorder.html');
// })

// app.get('/newset.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/newset.html');
// })

// app.get('/allorder.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/allorder.html');
// })

// app.get('/historyorder.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/hostoryorder.html');
// })

// app.get('/ordertime.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/ordertime.html');
// })

// app.get('/menu.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/menu.html');
// })

// app.get('/makingorder.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/makingorder.html');
// })

// app.get('/reg', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/reg.html');
// })

// app.get('/order.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/ordertime.html');
// })

// app.get('/option.html', function(req, res) {
//     res.sendFile(__dirname + '/frontend/html/option.html');
// })

app.get('/', function(req, res) {
    single.singleshowall(res);
})

// style.css
// app.get('/frontend/style.css', function(req, res) {
// 	res.sendFile(__dirname + '/frontend/style.css');
// })

// images
// app.get('/frontend/image/font.png', function(req, res) {
// 	res.sendFile(__dirname + '/frontend/image/font.png');
// })

// app.get('/frontend/image/plus.png', function(req, res) {
// 	res.sendFile(__dirname + '/frontend/image/plus.png');
// });

// app.get('/frontend/image/setting.jpg', function(req, res) {
//     res.sendFile(__dirname + '/frontend/image/setting.jpg');
// })

// app.get('/frontend/image/txt.jpg', function(req, res) {
//     res.sendFile(__dirname + '/frontend/image/txt.jpg');
// })

// app.get('/frontend/image/back.png', function(req, res) {
//     res.sendFile(__dirname + '/frontend/image/back.png');
// })

// app.get('/frontend/image/buycar.jpg', function(req, res) {
//     res.sendFile(__dirname + '/frontend/image/buycar.png');
// })

// script
app.get('/script/cosmterFunction.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/script/customerFunction.js');
})

// app.get('/script/bossFunction.js', function(req, res) {
// 	res.sendFile(__dirname + '/frontend/script/bossFunction.js');
// })

// function
app.post('/check_login', function(req, res) {

})

app.use('/create_order', function(req, res){
    var user_id = "001";
    // order.orderstore(user_id, null);
    res.redirect('order.html');
})

app.use('/add_to_cart', function(req, res){
    var food_id = req.body.food_id;
    cart.insertone(food_id);
    res.redirect('menu.html');
})

var name, price, description;

app.post('/editmenuplus.html', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    console.log(description);
    single.singlestore(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)