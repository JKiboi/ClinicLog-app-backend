const mongoose = require('mongoose');


const LogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    required: true
  },
  patientId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  procedures: {
    type: [String],
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('log', LogSchema);
