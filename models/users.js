const mongoose = require('mongoose');
const Rec = require('./recs.js');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  recs: [Rec.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
