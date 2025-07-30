export interface Post {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt?: string;
  likes?: string[]; 
  comments?: {
    user: {
      _id: string;
      username: string;
    };
    comment: string;
    createdAt: string;
  }[];
  user?: {
    _id: string;
    username: string;
  };
}
