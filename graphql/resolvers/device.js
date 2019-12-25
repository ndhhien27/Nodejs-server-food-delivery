import Restaurant from '../../models/restaurant.model';
import Food from '../../models/food.model';
import DishType from '../../models/dishType.model';
import Device from '../../models/device.model';

export default {
  Mutation: {
    clearUserDeviceInfo: async (_, { uniqueId }) => {
      try {
        const deviceHasUpdated = await Device
          .findOneAndUpdate({ uniqueId }, { $set: { fcmTokenUser: '', user: null } }, { new: true });
        return {
          ...deviceHasUpdated._doc,
          _id: deviceHasUpdated.id
        }
      } catch (error) {
        throw error
      }
    },
    clearMerchantDeviceInfo: async (_, { uniqueId }) => {
      try {
        const deviceHasUpdated = await Device
          .findOneAndUpdate({ uniqueId }, { $set: { fcmTokenMerchant: '', merchant: null } }, { new: true })
        return {
          ...deviceHasUpdated._doc,
          _id: deviceHasUpdated.id
        }
      } catch (error) {
        throw error
      }
    }
  }
}