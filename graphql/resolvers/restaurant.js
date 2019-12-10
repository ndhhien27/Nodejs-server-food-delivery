import Restaurant from '../../models/restaurant.model';
import User from '../../models/user.model';
import DishType from '../../models/dishType.model';
import Food from '../../models/food.model';
import { mergeArr } from '../../helpers/array';
export default {
  Query: {
    restaurants: async () => {
      try {
        const restaurant = await Restaurant.find({}).exec();
        return restaurant.map(item => ({
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
    },
    restaurantById: async (_, { restaurantId }) => {
      try {
        const restaurant = await Restaurant
          .findById(restaurantId)
          .populate('menu_info.foods');
        return {
          ...restaurant._doc,
          _id: restaurant.id
        }
      } catch (error) {
        throw error
      }
    },
    searchRestaurant: async (_, { query }) => {
      console.log(query);
      try {
        // const restaurants = await Restaurant.aggregate([{ $match: { $text: { $search: query } } }]);
        const restaurants = await Restaurant.aggregate([
          { $match: { $text: { $search: query } } },
          { $sort: { score: { $meta: "textScore" } } },
        ]);
        // const searchByNameAndAdress = restaurants.map(item => {
        //   return item._id
        // })
        // console.log(searchByNameAndAdress);
        // const food = await Food.distinct("restaurant", { $text: { $search: query } })
        const food = await Food.aggregate([
          {
            $match: { $text: { $search: query } }
          },
          {
            $lookup:
            {
              from: "restaurants",
              localField: "restaurant",
              foreignField: "_id",
              as: "restaurants"
            }
          },
          { $addFields: { score: { $meta: "textScore" } } },
          {
            $group:
            {
              _id: "$restaurants",
              itemsSold: { $addToSet: "$_id" },
              avgScore: { $avg: "$score" }
            }
          },
          { $sort: { avgScore: -1 } },
        ]);
        // console.log(food.map(item => {
        //   return {
        //     ...item
        //   }
        // }))
        const searchByFood = food.map(item => {
          return {
            ...item._id['0'],
            score: item.avgScore
          }
        });
        // console.log('byFood',searchByFood)
        // const dishType = await DishType.distinct("restaurant", { $text: { $search: query } });
        const dishType = await DishType.aggregate([
          {
            $match: { $text: { $search: query } }
          },
          {
            $lookup:
            {
              from: "restaurants",
              localField: "restaurant",
              foreignField: "_id",
              as: "restaurants"
            }
          },
          { $addFields: { score: { $meta: "textScore" } } },
          {
            $group:
            {
              _id: "$restaurants",
              itemsSold: { $addToSet: "$_id" },
              avgScore: { $avg: "$score" }
            }
          },
          { $sort: { avgScore: -1 } },
        ]);
        const searchByDishType = dishType.map(item => {
          return {
            ...item._id['0'],
            score: item.avgScore
          }
        });
        const mergedArr = mergeArr(restaurants,searchByFood);
        const result2 = mergeArr(mergedArr,searchByDishType);
        // console.log('RESULT',result2);
        // const temp = [
        //   ...searchByNameAndAdress,
        //   ...food,
        //   ...dishType,
        // ];
        // console.log(temp)
        // const result = await Restaurant.find({ _id: { $in: temp } })
        // console.log(result2[0].address)
        return result2.map(item=>{
          console.log(item.address)
          return {
            ...item
          }
        })
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
  Restaurant: {
    menu_info: async ({ _id }) => {
      return await DishType.find({ restaurant: _id });
    }
  }
}