let mongoose = require('mongoose');
let postSchema = mongoose.Schema({
    content: String,
    author: String,
});

let Post = mongoose.model('Post', postSchema);
module.exports = Post;

