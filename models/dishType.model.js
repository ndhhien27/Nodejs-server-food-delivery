import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dishTypeModel = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }
  ],
  name: {
    type: String,
    required: true
  }
});
dishTypeModel.index({
  name:'text'
})
export default mongoose.model('DishType', dishTypeModel);