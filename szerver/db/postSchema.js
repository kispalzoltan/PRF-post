const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    id:{
      type: String,
      required: true,
    },
    
  username: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});



const Post = mongoose.model('post', postSchema);

module.exports = Post;