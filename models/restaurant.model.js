import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  is_open: {
    type: Boolean,
    default: true
  },
  cuisines: [
    {
      type: String,
      required: true
    }
  ],
  name: {
    type: String,
    required: true,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  address: {
    type: String,
    required: true
  },
  // position: {
  //   latitute: {
  //     type: Number,
  //     required: true
  //   },
  //   longtitute: {
  //     type: Number,
  //     required: true
  //   }
  // },
  menu_info: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DishType'
    }
  ],
  rating: {
    avg: {
      type: Number,
      default: 0
    },
    total_review: {
      type: Number,
      default: 0
    }
  },
  bookmarks: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

restaurantSchema.index({
  address: 'text',
  name: 'text'
});

export default mongoose.model('Restaurant', restaurantSchema)