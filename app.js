var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use( express.static( "public" ) );
app.set('view engine', 'ejs');

app.use(bodyParser.json());

//Db config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

//Routes
app.use('/hackathon', require('./routes/api'));

//Port Listen
var Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Process running on ${Port}`);
})