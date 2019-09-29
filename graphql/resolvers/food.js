import Food from '../../models/food.model'
import Category from '../../models/category.model'

export default {
  Query: {
    foods: async () => {
      try {
        const foods = await Food.find({}).exec();
        return foods.map(food => ({
          ...food._doc,
          _id: food.id
        }))
      } catch (error) {
        throw error
      }
    },
    foodByCategory: async (_, { categoryId }) => {
      try {
        const result = await Food.find({ category: categoryId });
        return result.map(item => ({
          ...item._doc,
          _id: item.id
        }))
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createFood: async (_, { food }) => {
      const newFood = new Food({
        title: food.title,
        category: food.category,
        price: +food.price
      })
      try {
        await newFood.save();
        return {
          ...newFood._doc,
          _id: newFood.id
        }
      } catch (err) {
        throw err
      }
    }
  },
  Food: {
    category: async ({ category }) => {
      return await Category.findById(category).exec();
    }
  }
}