const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: {type:String},
    responseTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    postedBy:{type: String},
    postedById:{type: String}
}, {timestamps:true});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
