var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter = require('./routes/course');
var cors = require('cors')
var app = express();
mongoose.connect(process.env.MONGOURI,{useNewUrlParser: true , useUnifiedTopology : true })
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course', courseRouter);

module.exports = app;
