const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/irecommend'
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Present");
});
