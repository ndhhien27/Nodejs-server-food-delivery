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
  is_active: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number
  },
  img_uri: {
    type: String
  },
  price: {
    unit: {
      type: String,
      required: true,
      enum: ['đ','USD']
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
  dishType: {
    type: Schema.Types.ObjectId,
    ref: 'DishType'
  }
}, { timestamps: true })

FoodSchema.index({
  name:'text'
})

module.exports = mongoose.model('Food', FoodSchema)