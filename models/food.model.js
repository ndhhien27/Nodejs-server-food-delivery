const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  total_order: {
    type: Number,
    default: 0
  },
  is_available: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number
  },
  img_uri: {
    type: String
  },
  price: {
    text: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Food', FoodSchema)