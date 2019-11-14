import Order from '../../models/order.model';
import User from '../../models/user.model';
import Food from '../../models/food.model';
import Restaurant from '../../models/restaurant.model';

export default {
  Query: {
    orders: async () => {
      try {
        const orders = await Order.find()
          .populate('items.food')
          .populate('user')
          .populate('restaurant')
          .exec();
        return orders.map(item => ({
          ...item._doc,
          _id: item.id
        }))
      } catch (error) {
        throw error
      }
    },
    ordersOfRestaurant: async (_, { restaurantId }) => {
      try {
        const orders = await Order.find({ restaurant: restaurantId }).exec();
        return orders.map(item => ({
          ...item._doc,
          _id: item.id
        }))
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createOrder: async (_, { orderInput }) => {
      try {
        const newOrder = new Order({
          restaurant: orderInput.restaurant,
          user: orderInput.user,
          delivery_address: orderInput.delivery_address,
          items: orderInput.items
        })
        await newOrder.save();
        const userOfOrder = await User.findById(newOrder.user);
        if (!userOfOrder) throw new Error('User not exist');
        userOfOrder.orders.push(newOrder);
        await userOfOrder.save();
        const foodArr = orderInput.items.map(item => {
          return item.food
        });
        console.log(foodArr);
        await Food.updateMany({ _id: { $in: foodArr } }, { $inc: { total_order: 1 } })
        return {
          ...newOrder._doc,
          _id: newOrder.id
        }
      } catch (error) {
        throw error
      }
    }
  },
  Item: {
    food: async ({ food }) => {
      return await Food.findById(food);
    }
  },
  Order: {
    restaurant: async ({ restaurant }) => {
      return await Restaurant.findById(restaurant).exec()
    }
  }
}