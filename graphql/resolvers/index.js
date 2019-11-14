import { mergeResolvers, fileLoader } from 'merge-graphql-schemas';
import path from 'path';

// import foodResolver from './food';
// import dishTypeResolver from './dishType';
// import restaurantResolver from './restaurant';
// import orderResolver from './order';
// import userResolver from './user'
const resolversArray = fileLoader(path.join(__dirname, '.'), { recursive: true });
export default mergeResolvers(resolversArray);