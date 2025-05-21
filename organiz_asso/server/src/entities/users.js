const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    min: 3,
    max: 20,
    unique: true 
  },
  password: {
    type: String, 
    required: true,
    min: 4
  },
  admin: {
    type: Boolean, 
    required: true,
    default: false
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);