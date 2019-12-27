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
        const food = await Food.findOne({ name: foodInput.name, restaurant: foodInput.restaurant })
        if (food) throw new Error(`'${foodInput.name}' already exists`)
        const newFood = new Food({
          ...foodInput,
          price: {
            ...foodInput.price,
            value: +foodInput.price.value
          }
        })
        await newFood.save();
        await DishType.findOneAndUpdate({ _id: foodInput.dishType }, {
          $push: {
            "foods": newFood
          }
        });
        return {
          ...newFood._doc,
          _id: newFood.id,
        }
      } catch (error) {
        throw error
      }
    },
    updateFood: async (_, { foodId, updateValue }) => {
      try {
        const foodHasUpdated = await Food
          .findByIdAndUpdate(foodId, { $set: { ...updateValue } }, { new: true });
        return {
          ...foodHasUpdated._doc,
          _id: foodHasUpdated.id
        }
      } catch (error) {
        throw error;
      }
    }
  },
  Food: {
    restaurant: async ({ restaurant }) => {
      return await Restaurant.findById(restaurant);
    },
    dishType: async ({ dishType }) => {
      return await DishType.findById(dishType);
    }
  }
}