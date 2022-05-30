const mongoose = require('mongoose');
const { Schema } = mongoose;

const CertificateSchema = new Schema({
  serial: {
    type: Number,
    required: true,
    unique: true,
  },

  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
});

let User = mongoose.model('user', CertificateSchema);
User.createIndexes();
module.exports = User;
