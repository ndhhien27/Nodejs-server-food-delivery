import { mergeTypes } from 'merge-graphql-schemas';

import foodType from './food.type';
import categoryType from './category.type';

export default mergeTypes([foodType, categoryType], { all: true });