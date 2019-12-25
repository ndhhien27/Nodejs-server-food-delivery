import Order from '../../models/order.model';
import User from '../../models/user.model';
import Food from '../../models/food.model';
import Restaurant from '../../models/restaurant.model';
import Device from '../../models/device.model';
import NotificationOrder from '../../models/notificationOrder.model';
import dateToString from '../../helpers/date';
import API from '../../services/Notification';

export default {
  Query: {
    orders: async (parent, args, { isAuth }, info) => {
      // if (!isAuth) throw new Error('Unauthenticated');
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
    ordersByRestaurant: async (_, { restaurantId, status }) => {
      try {
        const orders = await Order.find({ restaurant: restaurantId }).sort({ createdAt: -1 });
        return orders.map(item => ({
          ...item._doc,
          _id: item.id,
          createdAt: dateToString(item._doc.createdAt),
          updatedAt: dateToString(item._doc.updatedAt)
        }))
      } catch (error) {
        throw error
      }
    },
    orderByUser: async (parent, { userId }) => {
      try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return orders.map(item => {
          return {
            ...item._doc,
            _id: item.id
          }
        })
      } catch (error) {
        throw error
      }
    },
    orderById: async (parent, { orderId }) => {
      try {
        const order = await Order.findById(orderId);
        return {
          ...order._doc,
          _id: order.id,
        };
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createOrder: async (_, { orderInput }) => {
      try {
        const newOrder = new Order({
          ...orderInput,
          subtotal: +orderInput.subtotal,
          total: +orderInput.total,
        })
        await newOrder.save();
        const userOfOrder = await User.findById(newOrder.user);
        if (!userOfOrder) throw new Error('User not exist');
        userOfOrder.orders.push(newOrder);
        await userOfOrder.save();
        const restaurantOfOrder = await Restaurant
          .findByIdAndUpdate(newOrder.restaurant, { $inc: { numOrders: 1 } });
        const newNotice = new NotificationOrder({
          title: `New Order`,
          order: newOrder,
          receiver: restaurantOfOrder._doc.merchant,
        })
        await newNotice.save();
        const devices = await Device.find({ merchant: restaurantOfOrder.merchant });
        for (const el of devices) {
          let { fcmTokenMerchant } = el;
          console.log(fcmTokenMerchant);
          API.sendNotification(
            { ...newNotice._doc, orderId: newOrder.id },
            'rest',
            fcmTokenMerchant,
            restaurantOfOrder.id,
            res => console.log(res),
            err => { throw err });
        };
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
    },
    updateOrder: async (_, { orderId, status }) => {
      try {
        const order = await Order.findByIdAndUpdate(orderId,
          { $set: { status } },
          { new: true });
        // const user = User.findById(order.user).populate('device');
        const restOfOrder = await Restaurant.findById(order.restaurant)
        const user = await User.findByIdAndUpdate(order.user, { $inc: { numNotification: 1 } });
        const newNotice = new NotificationOrder({
          title: `Your order has been ${status}`,
          order,
          receiver: user
        })
        await newNotice.save();
        const devices = await Device.find({ user: order.user });
        for (const el of devices) {
          let { fcmTokenUser } = el;
          console.log(fcmTokenUser);
          API.sendNotification(
            { ...newNotice._doc, orderId },
            'customer',
            fcmTokenUser,
            res => { },
            err => { throw err });
        }
        if (status === 'cancelled') {
          const devicesMerchant = await Device.find({ merchant: restOfOrder.merchant });
          for (const el of devicesMerchant) {
            let { fcmTokenMerchant } = el;
            console.log(fcmTokenMerchant);
            API.sendNotification(
              { ...newNotice._doc, orderId, title: 'The customer has canceled the order' },
              'rest',
              fcmTokenMerchant,
              restOfOrder.id,
              res => { },
              err => { throw err });
          }
        }
        return {
          ...order._doc,
          _id: order.id
        }
      } catch (error) {
        throw error
      }
    },
    reviewOrder: async (_, { orderId, star, description }) => {
      try {
        const order = await Order
          .findByIdAndUpdate(orderId, {
            $set: {
              review: {
                star, description
              }
            }
          }, { new: true });
        if (!order) throw new Error('Order does not exist');
        const rest = await Restaurant.findById(order.restaurant);
        const oldTotal = rest.rating.avg * rest.rating.total_review;
        rest.rating.total_review = rest.rating.total_review + 1;
        rest.rating.avg = +(oldTotal + star) / rest.rating.total_review;
        await rest.save();
        console.log(rest);
        return {
          ...order._doc,
          _id: order.id
        };
      } catch (error) {
        throw error
      }
    },
    merchantCancelOrder: async (parent, { orderId }) => {
      try {
        const order = await Order.findByIdAndUpdate(orderId,
          { $set: { status: 'cancelled' } },
          { new: true });
        // const user = User.findById(order.user).populate('device');
        const restOfOrder = await Restaurant.findById(order.restaurant)
        const user = await User.findByIdAndUpdate(order.user, { $inc: { numNotification: 1 } });
        const newNotice = new NotificationOrder({
          title: `Your order has been cancelled`,
          order,
          receiver: user
        })
        await newNotice.save();
        const devices = await Device.find({ user: order.user });
        for (const el of devices) {
          let { fcmTokenUser } = el;
          console.log(fcmTokenUser);
          API.sendNotification(
            { ...newNotice._doc, orderId },
            'customer',
            fcmTokenUser,
            res => { },
            err => { throw err });
        }
        return {
          ...order._doc,
          _id: order.id
        };
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
    },
    user: async ({ user }) => {
      return await User.findById(user);
    }
  }
}