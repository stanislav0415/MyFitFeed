import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import postService from "../services/postService.js"; 
import { getErrorMessage } from "../utils/errorUtils.js";
const postController = Router();
postController.get('/', async (req, res) => {
  try {
    const posts = await postService.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

postController.post('/create', isAuth, async (req, res) => {
  const postData = req.body;
  const userId = req.user.id;

  try {
    const createdPost = await postService.create(postData, userId);
    res.status(201).json(createdPost);
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});


postController.get('/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await postService.getOne(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

   
    const userId = req.user?.id;
    const isOwner = userId && post.user.equals(userId);
    const isLiked = userId && post.likes.some(likeUserId => likeUserId.equals(userId));

    res.json({ post, isOwner, isLiked });
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

postController.post('/:postId/like', isAuth, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const updatedPost = await postService.toggleLike(postId, userId);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

postController.delete('/:postId', isAuth, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    await postService.delete(postId, userId);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(403).json({ error: getErrorMessage(err) });
  }
});


postController.put('/:postId', isAuth, async (req, res) => {
  const postId = req.params.postId;
  const postData = req.body;
  const userId = req.user.id;

  try {
    const updatedPost = await postService.edit(postId, postData, userId);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

export default postController;
