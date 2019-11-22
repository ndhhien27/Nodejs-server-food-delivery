import Restaurant from '../../models/restaurant.model';
import Food from '../../models/food.model';
import DishType from '../../models/dishType.model';

export default {
  Query: {
    menuByRestaurant: async (_, { restaurantId }) => {
      const menu = await DishType.find({ restaurant: restaurantId });
      return menu.map(item => {
        return {
          ...item._doc,
          _id: item.id
        }
      })
    }
  },
  Mutation: {
    createDishType: async (_, { dishTypeInput }) => {
      try {
        const newDishType = new DishType({
          name: dishTypeInput.name,
          restaurant: dishTypeInput.restaurant
        });
        await newDishType.save();
        const restaurant = await Restaurant.findById(newDishType.restaurant)
        restaurant.menu_info.push(newDishType)
        await restaurant.save();
        return {
          ...newDishType._doc,
          _id: newDishType.id
        }
      } catch (error) {
        throw error
      }
    }
  },
  DishType: {
    foods: async ({ _id }) => {
      return await Food.find({ dish_type: _id });
    }
  }
}