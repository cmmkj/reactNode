'use strict'
const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const modelIndex = require('./models/index');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/reactNode');



let routes = require('./routes/index');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/out')));


app.use((req, res, next) => {
  req.getModel = (modelName) => {
    return modelIndex[modelName];
  }
  next();
})

require('./routes/index')(app);

app.get('*', function (req, res) {
  console.log('cccccccccccccccccccccccccccccccc')
  res.sendFile(path.resolve(__dirname, 'public/out', 'index.html'))
})
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
});

app.listen(3000, err => {
  console.log("server start successful,listen 3000");
})

