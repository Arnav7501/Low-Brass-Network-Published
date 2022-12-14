import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type Post2MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post2 {
  readonly id: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly number_of_likes?: number | null;
  readonly number_of_shares?: number | null;
  readonly name?: string | null;
  readonly reports?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post2, Post2MetaData>);
  static copyOf(source: Post2, mutator: (draft: MutableModel<Post2, Post2MetaData>) => MutableModel<Post2, Post2MetaData> | void): Post2;
}

export declare class Post {
  readonly id: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly number_of_likes?: number | null;
  readonly number_of_shares?: number | null;
  readonly User?: User | null;
  readonly reports?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postUserId?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly reports?: number | null;
  readonly blocks?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}