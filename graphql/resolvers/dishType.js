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
        const restaurant = await Restaurant.findById(dishTypeInput.restaurant);
        if (!restaurant) throw new Error('Restaurant does not exist');
        const dishType = await DishType.findOne({ name: dishTypeInput.name, restaurant:dishTypeInput.restaurant });
        if (dishType) throw new Error(`'${dishTypeInput.name}' already exists`);
        const newDishType = new DishType({
          name: dishTypeInput.name,
          restaurant: dishTypeInput.restaurant
        });
        await newDishType.save();
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
      return await Food.find({ dishType: _id });
    }
  }
}