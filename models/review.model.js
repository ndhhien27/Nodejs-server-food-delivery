import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
})

export default mongoose.model('Review', reviewSchema);