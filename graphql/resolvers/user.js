import bcrypt from 'bcryptjs';
import User from '../../models/user.model';
import Order from '../../models/order.model';
import Device from '../../models/device.model';
import jwt from 'jsonwebtoken';
import userValidate from '../../validate/user';

export default {
  Query: {
    users: async () => {
      try {
        let users = await User.find().exec();
        return users.map(user => ({
          ...user._doc,
          _id: user.id
        }))
      } catch (err) {
        console.log(err);
        throw err
      }
    },
    userById: async (_, { userId }) => {
      try {
        const user = await User.findById(userId)
        return {
          ...user._doc,
          _id: user.id
        }
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createUser: async (_, { userInput }) => {
      try {
        const userExist = await User.findOne({ email: userInput.email });
        if (userExist) throw new Error('User exists already');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userInput.password, salt);
        const newUser = new User({
          ...userInput,
          password: hashedPassword
        });
        await newUser.save();
        return {
          ...newUser._doc,
          password: null,
          _id: newUser.id
        }
      } catch (error) {
        throw error
      }
    },
    bookmark: async (_, { restaurantId, userId }) => {
      try {
        const user = await User.
          findOneAndUpdate(
            { _id: userId },
            { $push: { bookmarks: restaurantId } },
            { new: true }
          ).populate('bookmarks');
        // await user.save();
        return {
          ...user._doc,
          _id: user.id
        }
      } catch (error) {
        throw error
      }
    },
    login: async (_, { loginInput }) => {
      const { email, password, fcmTokenUser, uniqueId } = loginInput;
      console.log(userValidate.loginValidate({ email, password }).error);
      console.log(email, password);
      const user = await User.findOne({ email });
      if (!user) throw new Error("User does not exist");
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) throw new Error("Wrong password");
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, {
        expiresIn: 60
      })
      await Device.findOneAndUpdate(
        { uniqueId },
        { user, fcmTokenUser },
        { new: true, upsert: true }
      );
      return {
        userId: user.id,
        fName: user.fName,
        lName: user.lName,
        authToken: token,
        tokenExpiration: 1
      }
    },
    updateUser: async (_, { userId, updateValue }) => {
      const user = await User.findByIdAndUpdate(userId, { $set: { ...updateValue } }, { new: true });
      return {
        ...user._doc,
        _id: user.id
      }
    },
  },
  User: {
    orders: async ({ _id }) => {
      return await Order.find({ user: _id })
    }
  }
}