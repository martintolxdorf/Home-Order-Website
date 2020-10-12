const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment.js');

commentRouter.post('/newComment', (req,res) => {
  const comment = new Comment(req.body);

  comment.save((err,comment) => {
    if(err) return res.json({success:false, err})
    Comment.find({'_id': comment._id})
    .exec((err,result) => {
      if(err) return res.json({success:false, err})
      return res.status(200).json({success:true,result})
    })
  })
});

commentRouter.delete('/deleteComments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({success:true, data})
  });
  Comment.deleteMany({responseTo: req.params.id}, (err, data) => {
    if(err) return res.json({success:false, err})
  });
});



commentRouter.get('/getComments', (req,res) => {

  Comment.find({}).sort({"createdAt":-1}).exec((err,comments)=>{
    if(err) return res.status(400).send(err)
    res.status(200).json({success:true, comments})
  })

});



module.exports = commentRouter;
