require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const connectDB = require("./config/conn");
const cors = require("cors");

connectDB();

var usersRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
    origin: ['http://localhost:3002'],
    optionsSuccessStatus: 200, // some legacy browsers     (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions)); // CORS policy

app.use('/user', usersRouter);

module.exports = app;
