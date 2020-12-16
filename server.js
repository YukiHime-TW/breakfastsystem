const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./DB/routes/singleroute')
var insert  = require('./DB/SingleStore.js')
var single = require('./DB/model/single')
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

// html
app.get('/editmenu.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/editmenu.html');
})

app.get('/editmenuplus.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/editmenuplus.html');
})

app.get('/manage.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/manage.html');
})

app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/cart.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/cart.html');
})

app.get('/makingorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/makingorder.html');
})

app.get('/newset.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/newset.html');
})

app.get('/allorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/allorder.html');
})

app.get('/historyorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/hostoryorder.html');
})

app.get('/ordertime.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/ordertime.html');
})

app.get('/menu.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/menu.html');
})

app.get('/', function(req, res) {
	single.find()
	.then(response => {
		res.json({ response	})
	})
	.catch(err => {
		res.json({ message: 'Error' })
	})
})

app.get('/makingorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/makingorder.html');
})

app.get('/reg', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/reg.html');
})

app.get('/order.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/ordertime.html');
})

app.get('/option.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/option.html');
})

// style.css
app.get('/frontend/style.css', function(req, res) {
	res.sendFile(__dirname + '/frontend/style.css');
})

// images
app.get('/frontend/image/font.png', function(req, res) {
	res.sendFile(__dirname + '/frontend/image/font.png');
})

app.get('/frontend/image/plus.png', function(req, res) {
	res.sendFile(__dirname + '/frontend/image/plus.png');
});

app.get('/frontend/image/setting.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/setting.jpg');
})

app.get('/frontend/image/txt.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/txt.jpg');
})

app.get('/frontend/image/back.png', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/back.png');
})

app.get('/frontend/image/buycar.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/buycar.png');
})

// script
app.get('/script/cosmterFunction.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/script/cosmterFunction.js');
})

app.get('/script/bossFunction.js', function(req, res) {
	res.sendFile(__dirname + '/frontend/script/bossFunction.js');
})

// function
app.post('/check_login', function(req, res) {

})

var name, price, description;

app.post('/editmenuplus.html', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    console.log(description);
    insert.insertone(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)
