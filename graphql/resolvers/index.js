import { mergeResolvers } from 'merge-graphql-schemas';

import foodResolver from './food';
import categoryResolver from './category'

export default mergeResolvers([foodResolver, categoryResolver])