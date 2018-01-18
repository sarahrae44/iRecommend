const express = require('express');
const router = express.Router();
const Rec = require('../models/recs.js');
const User = require('../models/users.js');

router.get('/', (req, res) => {
  Rec.find({}, (err, foundRecs) => {
    res.render('recs/index.ejs', {
      recs: foundRecs
    });
  });
});

router.get('/new', (req, res) => {
  User.find({}, (err, allUsers) => {
    res.render('recs/new.ejs', {
      users: allUsers
    });
  });
});

router.post('/', (req, res) => {
  User.findById(req.body.userId, (err, foundUser) => {
    Rec.create(req.body, (err, createdRec) => {
      foundUser.recs.push(createdRec);
      foundUser.save((err, data) => {
        res.redirect('/recs');
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Rec.findById(req.params.id, (err, foundRec) => {
    User.findOne({'recs._id':req.params.id}, (err, foundUser) => {
      res.render('recs/show.ejs', {
        user: foundUser,
        rec: foundRec
      });
    })
  });
});

router.delete('/:id', (req, res) => {
  Rec.findByIdAndRemove(req.params.id, (err, foundRec) => {
    User.findOne({'recs._id': req.params.id}, (err, foundUser) => {
      foundUser.recs.id(req.params.id).remove();
      foundUser.save((err, data) => {
        res.redirect('/recs');
      });
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Rec.findById(req.params.id, (err, foundRec) => {
    User.find({}, (err, allUsers) => {
      User.findOne({'recs._id': req.params.id}, (err, foundRecUser) => {
        res.render('recs/edit.ejs', {
          rec: foundRec,
          users: allUsers,
          recUser: foundRecUser
        });
      });
    });
  });
});

router.put('/:id', (req, res) => {
  Rec.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedRec) => {
    User.findOne({ 'recs._id': req.params.id }, (err, foundUser) => {
      if(foundUser._id.toString() !== req.body.userId) {
        foundUser.recs.id(req.params.id).remove();
        foundUser.save((err, saveFoundUser) => {
          User.findById(req.body.userId, (err, newUser) => {
            newUser.recs.push(updatedRec);
            newUser.save((err, savedNewUser) => {
              res.redirect('/recs/'+req.params.id);
            });
          });
        });
      } else {
        foundUser.recs.id(req.params.id).remove();
        foundUser.recs.push(updatedRec);
        foundUser.save((err, data) => {
          res.redirect('/recs/'+req.params.id);
        });
      }
    });
  });
});

module.exports = router;
