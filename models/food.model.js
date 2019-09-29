const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  img_uri: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Food', FoodSchema)