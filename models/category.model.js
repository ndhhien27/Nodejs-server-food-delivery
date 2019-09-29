const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Category', CategorySchema)