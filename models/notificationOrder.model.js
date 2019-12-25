import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationOrderSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  receiver:{
    type:Schema.Types.ObjectId
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