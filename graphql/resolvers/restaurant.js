import Restaurant from '../../models/restaurant.model';
import User from '../../models/user.model';

export default {
  Query: {
    restaurants: async () => {
      try {
        const merchant = await Restaurant.find().populate('menu_info.foods').exec();
        return merchant.map(item => ({
          ...item._doc,
          _id: item.id,
        }))
      } catch (error) {
        throw error
      }
    },
    restaurantByMerchant: async (_, { merchantId }) => {
      try {

      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createRestaurant: async (_, { restaurantInput }) => {
      try {
        const newRestaurant = new Restaurant({
          ...restaurantInput
        })
        await User.findOneAndUpdate(
          { _id: restaurantInput.merchant },
          { $push: { created_restaurants: newRestaurant } },
        )
        await newRestaurant.save();

        return {
          ...newRestaurant._doc,
          _id: newRestaurant.id
        }
      } catch (error) {
        throw error
      }
    },
  },
  // Category: {
  //   foods: async ({ _id }) => {
  //     return await Food.find({ category: _id }).exec();
  //   }
  // }
}