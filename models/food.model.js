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
    ref: 'Restaurant'
  },
  dish_type: {
    type: Schema.Types.ObjectId,
    ref: 'DishType'
  }
}, { timestamps: true })

FoodSchema.index({
  name:'text'
})

module.exports = mongoose.model('Food', FoodSchema)