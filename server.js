const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./DB/routes/singleroute')
var insert  = require('./DB/SingleStore.js')
var single = require('./DB/model/single')
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

// html
app.get('/editmenu.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/editmenu.html');
})

app.get('/manage.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/manage.html');
})

app.get('/login.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/html/login.html');
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

// style.css
app.get('/style.css', function(req, res) {
	res.sendFile(__dirname + '/frontend/style.css');
})

// images
app.get('/font.png', function(req, res) {
	res.sendFile(__dirname + '/frontend/image/font.png');
})

app.get('/plus.png', function(req, res) {
	res.sendFile(__dirname + '/frontend/image/plus.png');
});

app.get('/setting.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/setting.jpg');
})

app.get('/txt.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/txt.jpg');
})

app.get('/back.png', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/back.png');
})

app.get('/buycar.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/image/buycar.png');
})

var name, price, description;
app.post('/insert', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    insert.insertone(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)
