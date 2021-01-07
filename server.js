const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const urlencodedParser = bodyParser.urlencoded({ extended: false})
const SingleRoutes = require('./DB/routes/singleroute')
const single = require('./DB/function/singlefunction.js')
const order = require('./DB/function/orderfunction.js')
const cart = require('./DB/function/cartfunction.js')
const User = require('./DB/model/user.js')
const Order = require('./DB/model/order.js')
const WebSocket = require('ws');
var order_id = 2;
// const singleCollection = require('./DB/model/single');
// const user = require('../../../../../../Downloads/test/models/user');
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
app.use(session({
    secret:'test',
    store:new MongoStore({url:'mongodb+srv://admin:00757019@breakfastsystem.pcfwe.mongodb.net/breakfastSystem?retryWrites=true&w=majority'}),
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:60 * 60 * 1000}
}))

app.use(express.static('frontend'))
app.use(express.static('frontend/html'));
app.get('/reg', function(req, res){
    res.sendFile(__dirname + '/frontend/html/reg.html')
})

// html

// style.css

// images

// script
app.get('/script/cosmterFunction.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/script/customerFunction.js');
})

// app.get('/script/bossFunction.js', function(req, res) {
// 	res.sendFile(__dirname + '/frontend/script/bossFunction.js');
// })

// function
app.post('/menu.html', function(req, res) {

})

app.post('/editmenumiddle.html', function(req, res) {
    single.SingleUpdateByName(req.body.name, req)
    res.redirect('/editmenu.html')
})

app.delete('/editmenumiddle.html', function(req, res) {
    single.SingleDelete(req.body.name)
    res.redirect('/editmenu.html')
})

app.post('/check_login', function (req, res) {
	var postData = {
        account: req.body.AC,
        password: req.body.PW
    };
    if(postData.account=="shopkeeper" && postData.password=="shopkeeper"){
        req.session.user = postData.account;
        console.log(req.session);
        console.log(req.sessionID);
        res.redirect('/manage.html');
    }
    else{
        User.findOne({
            account: postData.account,
            password: postData.password
        }, function (err, data) {
            if(err) throw err;
            if(data){
                console.log('登錄成功');
                req.session.user = postData.account;
                console.log(req.session);
                console.log(req.sessionID);
                res.redirect('/menu.html');
            }
            else{
                console.log('帳號或密碼錯誤')
                res.redirect('/index.html');
            }
        })
    }
});

app.post('/reg.html', function (req, res) {
    var postData = {
        gender: req.body.gender,
        account: req.body.AC,
        password: req.body.PW,
        user_name: req.body.Name,
        age: req.body.Age
    };
    User.findOne({account: postData.account}, function (err, data) {
        if (data) {
            console.log('用戶名已被註冊');
            res.redirect('reg');
        } 
        else {
            User.create(postData, function (err, data) {
                if (err) throw err;
                console.log('註冊成功');
            });
            req.session.user = postData.account;
            cart.newusercartcreate(postData.account);
            res.redirect('/index.html');
        }
    });
});

app.get('/state2',function(req,res){
    var order_id=req.query.order_id;
    var user=order.OrderReturnUserID(order_id);
    server.on('connection',function connection(ws,req){
        ws.on('message',function incoming(){
            server.clients.forEach(function each(client){
                if(client.session.user==user){
                    client.send('訂單已完成');
                }
            })
        })
    })
})

app.post('/send_cart', function(req, res){
    // console.log(req.body.cart)
    var postData = {
        order_num: order_id,
        user_id: req.session.user,
        state: 2,
        price: 0,
        food_id: [],
        set_id: []
    };
    if (Array.isArray(req.body.cart.num)) {
        for(var i = 0; i < req.body.cart.num.length; i++) {
            // console.log(req.body.cart.id[i])
            // console.log(req.body.cart.num[i])
            postData.food_id.push({id: req.body.cart.id[i], amount: req.body.cart.num[i]})
        }
        console.log(postData)
    }
    else {
        console.log(req.body.cart.id)
        console.log(req.body.cart.num)
        postData.food_id.push({id: req.body.cart.id, amount: req.body.cart.num})
    }
    Order.create(postData, function (err, data) {
        if (err) throw err;
        console.log('Successfully created order');
    })
    order_id++;
    res.redirect('/menu.html')
})

app.use('/create_order', function(req, res){
    var user_id = req.session.user;
    // order.orderstore(user_id, null);
    res.redirect('order.html');
})

app.use('/add_to_cart', function(req, res){
    var food_id = req.body.food_id;
    cart.insertone(food_id);
    res.redirect('menu.html');
})

app.get('/show_all_order', function(req, res) {
    res.sendFile(__dirname + '/frontend/script/order.json');
})

app.get('/my_cart', function(req, res) {        // 客人自己的購物車
    var user_id = req.session.user;
    cart.cartSearchByAccount(user_id, res)
})

app.get('/my_old_order', function(req, res) {
    var user_id = req.session.user;
    order.ordersearchbyuserid(user_id, res);
})

app.get('/my_active_order', function(req, res) {        // 顧客顯示個人訂單
    var user_id = req.session.user;
    order.searchbyuserid_active(user_id, res);
})

app.post('/mark_as_done', function(req, res) {
    var id = req.body.foor_id;
    
})

app.get('/logout', function (req, res){
    delete req.session.user;
    req.session.destroy();
    res.redirect('/index.html');
})

app.get('/get_menu', function(req, res) {
    single.SingleShowAll(res);
})

var name, price, description;

app.post('/editmenuplus.html', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    req.body.file;
    console.log(description);
    single.SingleStore(name, price, description);
    res.redirect('/editmenu.html')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)