<<<<<<< HEAD
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
=======
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./routes/singleroute')
var singleinsert  = require('./function/SingleStore.js')
var singledeleted  = require('./function/SingleDelete.js')
var singleshow = require('./function/SingleShowAll.js')
var singleupdate = require('./function/SingleFindOneAndUpdate.js')
var singlesearch = require('./function/SingleSearchOne.js')



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
    singleinsert.insertone(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})


app.post('/delete', urlencodedParser, function (req, res) {
    name = req.body.Name;
    singledeleted.deleteone(name);
    res.sendFile(__dirname + '/finish.html');
})


app.post('/update', urlencodedParser, function (req, res) {
    origin = req.body.Name
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    singleupdate.findoneandupdate(origin, name, price, description);
    res.sendFile(__dirname + '/finish.html');
})


app.get('/',urlencodedParser, function (req, res) {
    price = req.body.Price;
    singleshow.singleshowall(price);
    res.sendFile(__dirname + '/finish.html');

})


app.post('/searchone', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    singlesearch.findone(name, price);
    res.sendFile(__dirname + '/finish.html');
})
 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)
>>>>>>> origin/00757034
