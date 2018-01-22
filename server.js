const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: "recommendations are easy now",
  resave: false,
  saveUninitialized: false
}));

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


const recsController = require('./controllers/recs.js');
app.use('/recs', recsController);
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentuser
  });
});

app.get('/app', (req, res) => {
  if(req.session.currentuser){
    res.send('the party');
  } else {
    res.redirect('/sessions/new');
  }
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/irecommend'
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Present");
});
