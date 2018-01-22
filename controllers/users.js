const express = require('express');
const User = require('../models/users.js');
const Rec = require('../models/recs.js');
const router = express.Router();
// const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  if(req.session.logged) {
    User.find({}, (err, foundUsers) => {
      res.render('users/index.ejs', {
        users: foundUsers,
      });
    });
  } else {
    res.redirect('/sessions/login')
  }
});

// router.post('/', (req, res) => {
//   User.findOne({ username: req.body.username }, (err, foundUser) => {
//     if(bcrypt.compareSync(req.body.password, foundUser.password)) {
//       req.session.currentuser = foundUser;
//       console.log('this is it:' + req.session.currentuser);
//       res.redirect('/');
//     } else {
//       res.send('wrong password');
//     }
//   });
// });

router.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    // console.log(req.session, req.body);
    res.redirect('/users');
  });
});
//
// router.get('/new', (req, res) => {
//   res.render('users/new.ejs');
// });



// router.post('/register', (req, res) => {
//   const password = req.body.password;
//   const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   const userDbEntry = {};
//   userDbEntry.username = req.body.username;
//   userDbEntry.password = passwordHash;
//   User.create(userDbEntry, (err, user) => {
//     console.log(user);
//     req.session.username = user.username;
//     req.session.logged = true;
//     res.redirect('/users')
//   });
// })
//

//
// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if(err){
//
//     } else {
//       res.redirect('/')
//     }
//   });
// });

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render('users/show.ejs', {
      user: foundUser
    });
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, foundUser) => {
    const recIds = [];
    for (let i = 0; i < foundUser.recs.length; i++) {
      recIds.push(foundUser.recs[i]._id);
    }
    Rec.remove(
      {
        _id : {
          $in: recIds
        }
      },
      (err, data) => {
        res.redirect('/users');
      }
    );
  });
});

router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render('users/edit.ejs', {
      user: foundUser
    });
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/users');
  });
});

module.exports = router;
