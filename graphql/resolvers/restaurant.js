import Restaurant from '../../models/restaurant.model';
import mongoose from 'mongoose';
import Merchant from '../../models/merchant.model';
import DishType from '../../models/dishType.model';
import Food from '../../models/food.model';
import Order from '../../models/order.model';
import { mergeArr } from '../../helpers/array';
import { getDistanceFromLatLonInKm } from '../../helpers/distance';
import dateToString from '../../helpers/date';

const ObjectId = mongoose.Types.ObjectId;

export default {
  Query: {
    restaurants: async (_, { userLocation }) => {
      const { lat, long } = userLocation;
      try {
        const restaurants = await Restaurant.find();
        return restaurants.map(item => {
          return {
            ...item._doc,
            _id: item.id,
            distance: getDistanceFromLatLonInKm(
              lat,
              long,
              item._doc.position.lat,
              item._doc.position.long
            ),
          }
        })
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
        // const rest = await Restaurant.aggregate([{ $match: { _id: ObjectId(restaurantId) } }])
        // const rest2 = await Restaurant.populate(rest, { path: 'menu_info', populate: { path: 'foods' } })
        // console.log(rest2[0].menu_info[0].foods);
        return {
          ...restaurant._doc,
          _id: restaurant.id,
          createdAt: dateToString(restaurant._doc.createdAt),
          updatedAt: dateToString(restaurant._doc.updatedAt)
        }
      } catch (error) {
        throw error
      }
    },
    searchRestaurant: async (_, { query }) => {
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
        const mergedArr = mergeArr(restaurants, searchByDishType);
        const result2 = mergeArr(mergedArr, searchByFood);
        // console.log('RESULT',result2);
        // const temp = [
        //   ...searchByNameAndAdress,
        //   ...food,
        //   ...dishType,
        // ];
        // console.log(temp)
        // const result = await Restaurant.find({ _id: { $in: temp } })
        // console.log(result2[0].address)
        return result2.map(item => {
          return {
            ...item
          }
        })
      } catch (error) {
        throw error
      }
    },
    nearestRestaurants: async (_, { userLocation }) => {
      const { lat, long } = userLocation;
      try {
        const restaurants = await Restaurant.find();
        return restaurants.map(item => {
          return {
            ...item._doc,
            _id: item.id,
            distance: getDistanceFromLatLonInKm(
              lat,
              long,
              item._doc.position.lat,
              item._doc.position.long
            ),
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
        const existRest = await Restaurant.findOne({ name: restaurantInput.name })
        if (existRest) throw new Error('Restaurant already exists')
        const newRestaurant = new Restaurant({
          ...restaurantInput
        })
        await Merchant.findByIdAndUpdate(
          restaurantInput.merchant,
          { $set: { createdRestaurants: newRestaurant } },
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
    },
    orders: async ({ _id }) => {
      const orders = await Order.find({ restaurant: _id }).sort({ updatedAt: -1 });
      return orders.map(order => {
        return {
          ...order._doc,
          _id: order.id,
          createdAt: dateToString(order._doc.createdAt),
          updatedAt: dateToString(order._doc.updatedAt)
        }
      })
    }
  }
}