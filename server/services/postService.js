import Post from '../models/post.js';

export default {
  getAll(filter = {}) {
    let query = Post.find().populate('user', 'username');

    if (filter.search) {
      query = query.find({
        content: { $regex: filter.search, $options: 'i' },
      });
    }

    return query.sort({ createdAt: -1 }); 
  },

  getLatest() {
    return Post.find().sort({ createdAt: -1 }).limit(3).populate('user');
  },

  getOne(postId) {
    return Post.findById(postId).populate('user');
  },

  create(postData, userId) {

    return Post.create({ ...postData, user: userId });
  },

  async like(postId, userId) {
    const post = await this.getOne(postId);

    if (post.likes.includes(userId)) {
      throw new Error('You already liked this post.');
    }

    post.likes.push(userId);
    return post.save();
  },

  async unlike(postId, userId) {
    const post = await this.getOne(postId);
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    return post.save();
  },

  async comment(postId, userId, commentText) {
    const post = await this.getOne(postId);

    post.comments.push({
      user: userId,
      comment: commentText,
      createdAt: new Date(),
    });

    return post.save();
  },

  async delete(postId, userId) {
    const post = await this.getOne(postId);

    if (!post.user.equals(userId)) {
      throw new Error('Only the post owner can delete this post.');
    }

    return Post.findByIdAndDelete(postId);
  },

  async edit(postId, postData, userId) {
    const post = await this.getOne(postId);

    if (!post.user.equals(userId)) {
      throw new Error('Only the post owner can edit this post.');
    }

    return Post.findByIdAndUpdate(postId, postData, {
      new: true,
      runValidators: true,
    });
  },
};
