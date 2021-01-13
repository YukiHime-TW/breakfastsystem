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
const Single = require('./DB/model/single.js')
const Set = require('./DB/model/set.js')
const WebSocket = require('ws');
const { response } = require('express');
const schedule = require('node-schedule');

var order_id = 1;

schedule.scheduleJob('0 0 * * *', () => {
    order_id = 1;
})

var web_user;

const app = express()
const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })
let srv=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

const wss = new WebSocket.Server({ server:app });
var CLIENTS=[];
wss.on('open',function open(){
    console.log('connected');
})
wss.on('close',function close(){
    console.log('disconnected');
})
wss.on('connection',function connection(ws){
        if(ws.user_id==undefined)
        {    
            ws.user_id=web_user;
            CLIENTS.push(ws);
        }
})
srv.on('upgrade',function(req, socket, head) {
    wss.handleUpgrade(req, socket, head, function connected(ws) {
        wss.emit('connection', ws, req);
    })
})

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

app.get('/delete_single', function(req, res) {
    Single.findByIdAndDelete(req.query.delete_id, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        } 
    }); 
    console.log(req.query.delete_id)
    res.redirect('/editmenu.html')
})

app.post('/check_login', function (req, res) {
	var postData = {
        account: req.body.AC,
        password: req.body.PW
    };
    if(postData.account=="shopkeeper" && postData.password=="shopkeeper"){
        req.session.user = postData.account;
        web_user = req.session.user;
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
                web_user = req.session.user;
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
            web_user = req.session.user;
            cart.newusercartcreate(postData.account);
            res.redirect('/index.html');
        }
    });
});

app.post('/historyorder.html', function(req, res) {
    Order.find({state: 4})
    .then((response) => {
        res.json(response);
    })
    .catch((error) => {
        console.log('Find history order error!');
    })
    res.redirect('/historyorder.html');
});

app.get('/state2',function(req,res){
    var order_id = req.query.order_id;
    var user;
    ~async function(){
        const delay = (s) => {
            return new Promise(resolve => {
              setTimeout(resolve,s); 
            });
        };
        Order.findOne({$and: [{state: 2}, {order_num:order_id}]},function(err,obj){
            user=obj.user_id;
        })
        await delay(200);
        for(var i=0;i<CLIENTS.length;i++){
            console.log(CLIENTS[i].user_id);
            console.log(user);
            if(CLIENTS[i].user_id==user){
                CLIENTS[i].send('訂單已完成');
                break;
            }
        }
    }();
    Order.findOneAndUpdate({$and: [{state: 2}, {order_num:order_id}]}, {state: 3}, {returnOriginal: true})
    .then((response) => {
        console.log(response);
    })
    res.redirect('makingorder.html');
})

app.get('/state3',function(req,res){
    var order_id = req.query.order_id;
    Order.findOneAndUpdate({$and: [{state: 3}, {order_num:order_id}]}, {state: 4}, {returnOriginal: true})
    .then((response) => {
        console.log(response);
    })
    res.redirect('makingorder.html');
})

app.post('/send_cart', function(req, res){
    // console.log(req.body.cart)
    // console.log(req.body.price)
    var postData = {
        order_num: order_id,
        user_id: req.session.user,
        state: 2,
        price: 0,
        food_id: [],
        set_id: [],
        pickupTime: new Date()
    };
    var str = req.body.appt
    var time = str.match( /(\d+)\:(\d+)/ );
    var date = new Date()
    date.setHours(parseInt(time[1]))
    date.setMinutes(parseInt(time[2]))
    postData.pickupTime = date
    postData.price = req.body.price
    // console.log(date)
    // console.log(req.body.appt)
    if (Array.isArray(req.body.cart.num)) {
        for(var i = 0; i < req.body.cart.num.length; i++) {
            // console.log(req.body.cart.id[i])
            // console.log(req.body.cart.num[i])
            postData.food_id.push({id: req.body.cart.id[i], name: req.body.cart.name[i], amount: req.body.cart.num[i], finished: false})
        }
        console.log(postData)
    }
    else {
        console.log(req.body.cart.id)
        console.log(req.body.cart.num)
        postData.food_id.push({id: req.body.cart.id, name: req.body.cart.name, amount: req.body.cart.num, finished: false})
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
    // res.sendFile(__dirname + '/frontend/script/order.json');
    Order.find().sort('createdAt')
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        console.log(error)
    });
})

app.get('/show_all_active_order', function(req, res) {
    Order.find({$or: [{state: 2}, {state: 3}] }).sort('createdAt')
    .then(response =>{
        // console.log(response)
        res.json(response)
    })
    .catch(error =>{
        console.log('No Active order')
    });
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
    console.log(req.session.user)
    Order.find({$and:[{user_id: req.session.user}, {$or: [{state: 1}, {state: 2}, {state: 3}] } ] } ) 
    .then(response =>{
        console.log(response)
        res.json(response)
    })
    .catch(error =>{
        console.log('No Active order')
    });
})

app.post('/new_set', function(req, res) {
    console.log(req.body)
    var postData = {
        set_name: req.body.Name, 
        price: req.body.Price,
        description: req.body.Introduce,
        food_id : []
    }
    if (Array.isArray(req.body.set.id)) {
        for(var i = 0; i < req.body.set.id.length; i++) {
            postData.food_id.push(req.body.set.id[i])
        }
    }
    else {
        console.log('Not a set')
        postData.food_id.push(req.body.set.id)
    }
    console.log(postData)
    Set.create(postData, function (err, data) {
        if (err) throw err;
        console.log('Successfully created set');
    })
    res.redirect('manage.html');
})

app.get('/mark_as_done', function(req, res) {
    console.log(req.query.item)
    Order.findOneAndUpdate({$and: [{state: 2}, {order_num: req.query.order_id}], 'food_id._id': req.query.item}, {$set: {'food_id.$.finished': true}}, {select: {food_id: {$elemMatch: {finished: false}}}, returnOriginal: true})
    res.redirect('/makingorder.html')
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

app.use('/api/singleroute', SingleRoutes)