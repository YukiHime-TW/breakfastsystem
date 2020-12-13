const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var SingleRoutes = require('./routes/singleroute')
var insert  = require('./SingleStore.js')
var deleted  = require('./SingleDelete.js')
var show = require('./SingleShowAll.js')
var update = require('./SingleFindOneAndUpdate.js')
var search = require('./SingleSearchOne.js')

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
    insert.insertone(name, price, description);
    res.sendFile(__dirname + '/finish.html');
})

/*
app.post('/delete', urlencodedParser, function (req, res) {
    name = req.body.Name;
    deleted.deleteone(name);
    res.sendFile(__dirname + '/finish.html');
})
*/
/*
app.post('/update', urlencodedParser, function (req, res) {
    origin = req.body.Name
    name = req.body.Name;
    price = req.body.Price;
    description = req.body.Introduce;
    update.findoneandupdate(origin, name, price, description);
    res.sendFile(__dirname + '/finish.html');
})
*/
/*
app.get('/',urlencodedParser, function (req, res) {
    price = req.body.Price;
    show.singleshowall(price);
    res.sendFile(__dirname + '/finish.html');

})
*/
/*
app.post('/searchone', urlencodedParser, function (req, res) {
    name = req.body.Name;
    price = req.body.Price;
    search.findone(name, price);
    res.sendFile(__dirname + '/finish.html');
})
*/ 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/singleroute', SingleRoutes)
