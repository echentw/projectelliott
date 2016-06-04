var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  problems: [ { type: Number } ]
});

module.exports = {
  User: mongoose.model('User', userSchema)
};
