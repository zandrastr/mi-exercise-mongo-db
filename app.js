var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Import the installed MongoDB package to project
const MongoClient = require("mongodb").MongoClient;

//Connect to local
MongoClient.connect("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true
})
.then(client => {
    console.log("Connection to database ok!")

    //app.locals is a way to store application-level variables.
    //db can be accessed throughout the app, allowing different parts of the app to interact with the same database instance.
    const db = client.db("usersbook");
    app.locals.db = db;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;