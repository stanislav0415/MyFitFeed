export interface Post {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt?: string;

  user?: {
    _id: string;
    username: string;
  };

  likes?: string[];  
}