import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  position: [
    {
      address: {
        type: String,
        required: true
      },
      lat: {
        type: Number,
        required: true
      },
      long: {
        type: Number,
        required: true
      }
    }
  ],
  payment: [
    {
      paymentType: {
        type: String,
        default: 'cash'
      },
      detail: {
        type: String,
        default: 'Payment on delivery'
      }
    }
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  ],
  numNotification: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('User', userSchema);