import { Schema, model, Types } from 'mongoose';

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
  },
 image: {
           type: String,
           require: true,
           validate: /^https?:\/\//i,
   
       },
  likes: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      user: { type: Types.ObjectId, ref: 'User' },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model('Post', postSchema);

export default Post;
