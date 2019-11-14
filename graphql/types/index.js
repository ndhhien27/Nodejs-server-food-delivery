import { mergeTypes, fileLoader } from 'merge-graphql-schemas';
import path from 'path'

// import foodType from './food.type';
// import dishType from './dishType.type';
// import restaurantType from './restaurant.type';
// import orderType from './order.type';
// import userType from './user.type';
const typesArray = fileLoader(path.join(__dirname, '.'));
export default mergeTypes(typesArray, { all: true });