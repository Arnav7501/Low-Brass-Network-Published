// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post2, Post, User } = initSchema(schema);

export {
  Post2,
  Post,
  User
};