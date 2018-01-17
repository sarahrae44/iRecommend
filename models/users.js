const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: String,
  hobby: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
