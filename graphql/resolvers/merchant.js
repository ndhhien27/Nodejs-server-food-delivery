import bcrypt from 'bcryptjs';
import Merchant from '../../models/merchant.model';
import Restaurant from '../../models/restaurant.model'
import Device from '../../models/device.model';
import jwt from 'jsonwebtoken';
import userValidate from '../../validate/user';

export default {
  Query: {
    merchants: async () => {
      try {
        let merchants = await Merchant.find().exec();
        return merchants.map(merchant => ({
          ...merchant._doc,
          _id: merchant.id
        }))
      } catch (err) {
        throw err
      }
    },
    merchantById: async (_, { merchantId }, { isAuth }) => {
      if (!isAuth) throw new Error('Unauthenticated');
      try {
        const merchant = await Merchant.findById(merchantId)
        return {
          ...merchant._doc,
          _id: merchant.id
        }
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createMerchant: async (_, { merchantInput }) => {
      try {
        const merchantExist = await Merchant.findOne({ email: merchantInput.email });
        if (merchantExist) throw new Error('Merchant exists already');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(merchantInput.password, salt);
        const newMerchant = new Merchant({
          ...merchantInput,
          password: hashedPassword
        });
        await newMerchant.save();
        return {
          ...newMerchant._doc,
          password: null,
          _id: newMerchant.id
        }
      } catch (error) {
        throw error
      }
    },
    updateMerchant: async (_, { merchantId, updateValue }) => {
      const merchant = await Merchant.findByIdAndUpdate(merchantId, { $set: { ...updateValue } }, { new: true });
      return {
        ...merchant._doc,
        _id: merchant.id
      }
    },
    merchantLogin: async (_, { loginInput }) => {
      const { email, password, fcmTokenMerchant, uniqueId } = loginInput;
      console.log(userValidate.loginValidate({ email, password }).error);
      console.log(email, password);
      const merchant = await Merchant.findOne({ email });
      if (!merchant) throw new Error("Merchant does not exist");
      const isEqual = await bcrypt.compare(password, merchant.password);
      if (!isEqual) throw new Error("Wrong password");
      const token = jwt.sign({ merchantId: merchant.id, email: merchant.email }, process.env.SECRET_KEY, {
        expiresIn: '2h'
      })
      await Device.findOneAndUpdate(
        { uniqueId },
        { merchant, fcmTokenMerchant },
        { new: true, upsert: true }
      );
      return {
        merchantId: merchant.id,
        fName: merchant._doc.fName,
        lName: merchant._doc.lName,
        authToken: token,
        tokenExpiration: 2
      }
    },
  },
  Merchant: {
    createdRestaurants: async ({ _id }) => {
      return await Restaurant.findOne({ merchant: _id })
    }
  }
}