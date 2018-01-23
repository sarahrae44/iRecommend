const mongoose = require('mongoose');
const User = require('./users.js');

const recSchema = mongoose.Schema({
  recommendee: String,
  title: String,
  body: String
});

const Rec = mongoose.model('Rec', recSchema);

module.exports = Rec;
