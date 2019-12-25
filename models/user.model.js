import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fName: {
    type: String,
    required: true
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  ],
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
  payment: {
    type: [
      {
        paymentType: {
          type: String,
          required: true
        },
        detail: {
          type: String,
          required: true
        }
      }
    ],
    default: [
      {
        paymentType: 'cash',
        detail: 'Payment on delivery'
      }
    ]
  },
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