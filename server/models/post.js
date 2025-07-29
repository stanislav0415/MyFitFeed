import { Schema, model, Types } from 'mongoose';

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
  },
  imageUrl: {
    type: String,
    required: false,
    validate: {
      validator: function (value) {
        return !value || /^https?:\/\/.+/i.test(value);
      },
      message: 'Image URL must be a valid HTTP/HTTPS URL.',
    },
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
},
{
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});
const Post = model('Post', postSchema);

export default Post;