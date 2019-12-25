import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  is_open: {
    type: Boolean,
    default: true
  },
  cuisines: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  position: {
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
  },
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
  img_url:{
    type: String,
    default: 'https://res.cloudinary.com/ndhienedu/image/upload/v1576662631/brooke-lark-4J059aGa5s4-unsplash_nqhc4k.jpg'
  },
  bookmarks: {
    type: Number,
    default: 0
  },
  numOrders: {
    type: Number,
    default: 0
  },
}, { timestamps: true })

restaurantSchema.index({
  address: 'text',
  name: 'text'
});

export default mongoose.model('Restaurant', restaurantSchema)