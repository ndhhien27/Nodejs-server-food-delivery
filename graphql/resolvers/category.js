import Category from '../../models/category.model';

import dateToString from '../../helpers/date';

export default {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find({}).exec();
        return categories.map(category => ({
          ...category._doc,
          _id: category.id,
          createdAt: dateToString(category._doc.createdAt),
          updatedAt: dateToString(category._doc.updatedAt)
        }))
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createCategory: async (_, { category }) => {
      const categoryExist = await Category.findOne({ title: category.title });
      if (categoryExist) throw new Error('Category exists already')
      const newCategory = new Category({
        title: category.title
      })
      try {
        await newCategory.save();
        return {
          ...newCategory._doc,
          _id: newCategory.id
        }
      } catch (err) {
        throw err
      }
    }
  }
}