import Restaurant from '../../models/restaurant.model';
import Food from '../../models/food.model';

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
    }
  },
  Mutation: {
    createRestaurant: async (_, { merchantInput }) => {
      try {
        const newMerchant = new Restaurant({
          name: merchantInput.name,
          address: merchantInput.address,
          menu: merchantInput.menu
        })

        await newMerchant.save();

        return {
          ...newMerchant._doc,
          _id: newMerchant.id
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