import Restaurant from '../../models/restaurant.model';
import Food from '../../models/food.model';

export default {
  Mutation: {
    createDishType: async (_, { dishTypeInput }) => {
      try {
        const restaurant = await Restaurant.findById(dishTypeInput.restaurant)
        const newDishType = {
          name: dishTypeInput.name,
        }
        restaurant.menu_info.push(newDishType)
        await restaurant.save();
        return {
          ...restaurant._doc,
          _id: restaurant.id
        }
      } catch (error) {
        throw error
      }
    }
  },
  // Category: {
  //   foods: async ({ _id }) => {
  //     return await Food.find({ category: _id }).exec();
  //   }
  // }
}