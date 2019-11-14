import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  is_open: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    required: true
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
      name: {
        type: String,
        required: true
      },
      foods: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Food'
        }
      ]
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

export default mongoose.model('Restaurant', restaurantSchema)