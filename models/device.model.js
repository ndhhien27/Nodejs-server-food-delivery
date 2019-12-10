import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  fcmToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  uniqueId: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Device', deviceSchema);