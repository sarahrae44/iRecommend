const express = require('express');
const router = express.Router();
const Rec = require('../models/recs.js');

router.get('/', (req, res) => {
  Rec.find({}, (err, foundRecs) => {
    res.render('recs/index.ejs', {
      recs: foundRecs
    });
  });
});

router.get('/new', (req, res) => {
  res.render('recs/new.ejs');
});

router.post('/', (req, res) => {
  Rec.create(req.body, (err, createdRec) => {
    res.redirect('/recs');
  });
});

router.get('/:id', (req, res) => {
  Rec.findById(req.params.id, (err, foundRec) => {
    res.render('recs/show.ejs', {
      rec: foundRec
    });
  });
});

router.delete('/:id', (req, res) => {
  Rec.findByIdAndRemove(req.params.id, () => {
    res.redirect('/recs');
  });
});

router.get('/:id/edit', (req, res) => {
  Rec.findById(req.params.id, (err, foundRec) => {
    res.render('recs/edit.ejs', {
      rec: foundRec
    });
  });
});

router.put('/:id', (req, res) => {
  Rec.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/recs');
  });
});

module.exports = router;
