import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema({
  items: [
    {
      food: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  delivery_address: {
    type: String,
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)