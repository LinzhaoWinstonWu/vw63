var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var routes = require('./routes/imagefile');

//Connection URL
var url = 'mongodb://localhost:27017/widgetspace';
// var url = 'mongodb://localhost:3000/widgetspace';

//Use connect method to connect to the server
//mongoose.connect(url);

var app = express();

app.use(express.static(path.resolve('C:\\Users\\user\\widget_space_frontend\\src\\static\\js')));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.use('/', routes);

app.listen(3000);
console.log('Running on port 3000');