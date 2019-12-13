import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationOrderSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  hasRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model('NotificationOrder', notificationOrderSchema);