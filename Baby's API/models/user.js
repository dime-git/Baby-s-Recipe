const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  repeat_password: {
    type: String,
    required: true
  },
  birthday: {
      type: Date,
      default: Date.now()
  }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)