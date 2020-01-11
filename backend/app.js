const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/questions');
const resultRoutes = require('./routes/result');

const app = express();

mongoose.connect('mongodb+srv://blz:mrunal12@cluster0-nslbx.mongodb.net/online-exam?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
   console.log('Connected to db');
 })
 .catch((err) => {
   console.log(err);
   console.log('Connection to db failed');
 })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/result', resultRoutes);

module.exports = app;
