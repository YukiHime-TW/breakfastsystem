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

app.get('/get_menu', function(req, res) {
    single.singleshowall(res);
})

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

app.get('/my_cart', function(req, res) {
    var user_id = req.session.user;
    cart.cartsearchbyuserid(user_id, res);
})

app.get('/my_old_order', function(req, res) {
    var user_id = req.session.user;
    order.ordersearchbyuserid(user_id, res);
})

app.get('/my_active_order', function(req, res) {
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

var name, price, description;

app.post('/editmenuplus.html', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    req.body.file;
    console.log(description);
    single.singlestore(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)