const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('users/login.ejs', { message:
  req.session.message || ''})
})

router.get('/register', (req, res) => {
  res.render('users/register.ejs', {})
})

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.message = '';
        req.session.username = req.body.username;
        req.session.logged = true;
        console.log(req.session, req.body);
        res.redirect('/users');
      } else {
        console.log('else in bcrypt compare');
        req.session.message = "Username or password are incorrect";
        res.redirect('/sessions/login')
      }
    } else {
      req.session.message = "username or password are incorrect";
      res.redirect('/sessions/login')
    }
  });
});

router.post('/register', (req, res) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err, user) => {
    console.log(user);
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/users')
  });
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      res.redirect('/')
  });
});

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentuser = foundUser;
      res.redirect('/');
    } else {
      res.send('wrong password');
    }
  });
});


module.exports = router;
