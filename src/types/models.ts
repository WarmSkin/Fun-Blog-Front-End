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
  ownerId: { id: number };
  id: number;
  owner: Profile;
  likeReceived: Like[];
  commentReceived: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  profileId: { id: number };
  blogId: { id: number };
  id: number;
  owner: Profile;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  profileId: { id: number };
  blogId: { id: number };
  content: string;
  owner: Profile;
  id: number;
  createdAt: string;
  updatedAt: string;
}