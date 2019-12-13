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
    ref: 'Review'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  payment:{
    paymentType:{
      type: String,
      required:true
    },
    detail:{
      type: String,
      required:true
    }
  }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)