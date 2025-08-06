import Post from '../models/post.js';
import mongoose from 'mongoose';

export default {
  async addComment(postId, userId, commentText) {
    const comment = {
     user: new mongoose.Types.ObjectId(userId),
      comment: commentText,
      createdAt: new Date(),
    };

    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    post.comments.push(comment);
    await post.save();
    const updatedPost = await Post.findById(postId).populate('comments.user', 'username'); 
    return updatedPost;
  
  },

  async editComment(postId, commentId, userId, newCommentText) {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const comment = post.comments.id(commentId);
    if (!comment) throw new Error('Comment not found');
    if (comment.user.toString() !== userId.toString()) {
      throw new Error('Not authorized to edit this comment');
    }

    comment.comment = newCommentText;
    await post.save();

    return comment; // raw comment, user is ObjectId
  },

  async deleteComment(postId, commentId, userId) {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const comment = post.comments.id(commentId);
    if (!comment) throw new Error('Comment not found');
    if (comment.user.toString() !== userId.toString()) {
      throw new Error('Not authorized to delete this comment');
    }

    post.comments.pull(commentId);
    await post.save();

    return true;
  },
};
