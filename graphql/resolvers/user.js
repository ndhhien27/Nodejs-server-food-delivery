import bcrypt from 'bcryptjs';
import User from '../../models/user.model';

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
    }
  }
}