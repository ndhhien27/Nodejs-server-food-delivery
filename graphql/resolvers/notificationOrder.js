import NotificationOrder from '../../models/notificationOrder.model';
import User from '../../models/user.model';
import Restaurant from '../../models/restaurant.model';
import Order from '../../models/order.model';
import dateToString from '../../helpers/date';

export default {
  Query: {
    notificationByUser: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User do not exist');
        const notifications = await NotificationOrder.find({ receiver: userId }).sort({ createdAt: -1 })
        return notifications.map(item => {
          return {
            ...item._doc,
            _id: item.id,
            createdAt: dateToString(item._doc.createdAt)
          };
        });
      }
      catch (error) {
        throw error
      }
    },
    notificationByRest: async (_, { restId }) => {
      try {
        const restaurant = await Restaurant.findById(restId);
        if (!restaurant) throw new Error('Restaurant do not exist');
        const notifications = await NotificationOrder.find({ restaurant: restId });
        return notifications.map(item => {
          return {
            ...item._doc,
            _id: item.id
          };
        });
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    markAsRead: async (_, { notificationId }) => {
      try {
        const notification = await NotificationOrder
          .findByIdAndUpdate(notificationId, { $set: { hasRead: true } }, { new: true });
        return {
          ...notification._doc,
          _id: notification.id
        }
      } catch (error) {
        throw error
      }
    },
    deleteNoti: async (_, { notificationId }) => {
      try {
        const noticeHasDelete = await NotificationOrder.findByIdAndDelete(notificationId)
        return {
          ...noticeHasDelete._doc,
          _id: noticeHasDelete.id,
        }
      } catch (error) {
        throw error
      }
    }
  },
  NotificationOrder: {
    order: async ({ order }) => {
      try {
        return await Order.findById(order);
      } catch (error) {
        throw error
      }
    }
  }
}