import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const merchantSchema = new Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdRestaurants: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
}, { timestamps: true })

export default mongoose.model('Merchant', merchantSchema);