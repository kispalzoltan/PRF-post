const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('post');

const passport = require('passport');



async function getPost(req, res, next) {
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'A post nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.post = post; 
  next();
}


router.get('/post', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/post/:id', getPost, (req, res) => { 

  res.json(res.post); 
});


router.post('/post', async (req, res) => {
  const post = new Post({
    id: req.body.id,
    username: req.body.username,
    description: req.body.description,
    title: req.body.title,
    created: req.body.created,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/post/:id', getPost, async (req, res) => {
  if (req.body.id != null) {
    res.post.id = req.body.id;
  }
  if (req.body.username != null) {
    res.post.username = req.body.username;
  }
  if (req.body.description != null) {
    res.post.description = req.body.password;
  }
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.description != null) {
    res.post.description = req.body.description;
  }
  if (req.body.created != null) {
    res.post.created = req.body.created;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/post/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'A post sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router