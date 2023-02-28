/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  content: string;
  photo?: string;
  ownerId: number;
  id: number;
  owner: Profile;
  likeReceived: Like[];
  commentReceived: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  profileId: number;
  blogId: number;
  id: number;
  owner: Profile;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  profileId: number;
  blogId: number;
  content: string;
  owner: Profile;
  id: number;
  createdAt: string;
  updatedAt: string;
}