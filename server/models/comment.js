import { Schema, Types } from 'mongoose';

const commentSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { _id: true }); 

export default commentSchema;
