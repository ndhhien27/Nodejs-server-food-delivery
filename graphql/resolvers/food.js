import Food from '../../models/food.model';
import Restaurant from '../../models/restaurant.model';
import DishType from '../../models/dishType.model';

export default {
  Query: {
    foodsByRestaurant: async (_, { restaurantId }) => {
      try {
        const foods = await Food.find({ restaurant: restaurantId });
        return foods.map(item => {
          return {
            ...item._doc,
            _id: item.id
          }
        })
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createFood: async (_, { foodInput }) => {
      try {
        const newFoods = foodInput.detail.map(item => {
          return {
            restaurant: foodInput.restaurant,
            name: item.name,
            price: {
              ...item.price,
              value: +item.price.value
            },
            dish_type: foodInput.dishType
          }
        })
        // await newFood.save();
        const foodsSaved = await Food.create(newFoods);
        await DishType.findOneAndUpdate({ name: foodInput.dishType }, {
          $push: {
            "foods": { $each: foodsSaved }
          }
        });
        return foodsSaved.map(item => {
          return {
            ...item._doc,
            _id: item.id
          }
        });
      } catch (error) {
        throw error
      }
    }
  },
  Food: {
    restaurant: async ({ restaurant }) => {
      return await Restaurant.findById(restaurant);
    },
    dish_type: async ({ dish_type }) => {
      return await DishType.findById(dish_type);
    }
  }
}