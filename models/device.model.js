import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  fcmTokenUser: {
    type: String,
    required: true
  },
  fcmTokenMerchant: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant'
  },
  uniqueId: {
    type: String,
    required: true
  },
}, { timestamps: true })

export default mongoose.model('Device', deviceSchema);