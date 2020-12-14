<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d17de1301e88d9fa209ff583c494a7e9e7c0d6c
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
<<<<<<< HEAD
var SingleRoutes = require('../DB/routes/singleroute')
var insert  = require('../DB/SingleStore.js')
var single = require('../DB/model/single')
=======
var SingleRoutes = require('./routes/singleroute')
var insert  = require('./SingleStore.js')
var single = require('./model/single')
>>>>>>> 3d17de1301e88d9fa209ff583c494a7e9e7c0d6c
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
<<<<<<< HEAD

app.get('/editmenu.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/editmenu.html');
})

app.get('/style.css', function(req, res) {
	res.sendFile(__dirname + '/frontend/style.css');
})

app.get('/font.png', function(req, res) {
	res.sendFile(__dirname + '/frontend/font.png');
})

app.get('/plus.png', function(req, res) {
	res.sendFile(__dirname + '/frontend/plus.png');
});

app.get('/setting.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/setting.jpg');
})

app.get('/txt.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/txt.jpg');
})

app.get('/buycar.jpg', function(req, res) {
    res.sendFile(__dirname + '/frontend/buycar.png');
})

app.get('/manage.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/manage.html');
})

app.get('/login.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/login.html');
})

app.get('/makingorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/makingorder.html');
})

app.get('/newset.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/newset.html');
})

app.get('/allorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/allorder.html');
})

app.get('/historyorder.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/hostoryorder.html');
})

app.get('/ordertime.html', function(req, res) {
    res.sendFile(__dirname + '/frontend/ordertime.html');
})

=======
>>>>>>> 3d17de1301e88d9fa209ff583c494a7e9e7c0d6c
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
<<<<<<< HEAD
=======
=======
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./routes/singleroute')
var insert  = require('./SingleStore.js')
var single = require('./model/single')
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
    insert.insertone(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)
>>>>>>> origin/00757034
>>>>>>> 3d17de1301e88d9fa209ff583c494a7e9e7c0d6c
