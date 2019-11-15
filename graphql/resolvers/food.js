import Food from '../../models/food.model'
import Restaurant from '../../models/restaurant.model'

export default {
  Mutation: {
    // createFood: async (_, { food }) => {
    //   const newFood = new Food({
    //     title: food.title,
    //     category: food.category,
    //     price: +food.price
    //   })
    //   try {
    //     await newFood.save();
    //     return {
    //       ...newFood._doc,
    //       _id: newFood.id
    //     }
    //   } catch (err) {
    //     throw err
    //   }
    // }
    createFood: async (_, { foodInput }) => {
      try {
        const newFood = new Food({
          name: foodInput.name,
          price: {
            ...foodInput.price,
            value: +foodInput.price.value
          },
          restaurant: foodInput.restaurant
        })
        await newFood.save();
        await Restaurant.findOneAndUpdate({ _id: foodInput.restaurant, "menu_info.name": foodInput.dishType }, {
          $push: {
            "menu_info.$.foods": newFood
          }
        })

        return {
          ...newFood._doc,
          _id: newFood.id
        }
      } catch (error) {
        throw error
      }
    }
  },
  Food: {
    restaurant: async ({ restaurant }) => {
      return await Restaurant.findById(restaurant);
    }
  }
}