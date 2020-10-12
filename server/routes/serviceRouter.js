const express = require('express');
const serviceRouter = express.Router();
const Service = require('../models/service.js');

serviceRouter.get('/', async (req, res) => {  // ONLY GETS NOT ACCEPTED ORDERS***
    Service.find({status: "Not Accepted"}, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

serviceRouter.get('/getServices', (req,res) => {

  Service.find({}).sort({"createdAt":-1}).exec((err,services)=>{
    if(err) return res.status(400).send(err)
    res.status(200).json({success:true, services})
  })

});

serviceRouter.post('/newService', (req,res) => {
  const service = new Service(
  {
	content: req.body.content,
	responseTo: req.body.responseTo,
	postedBy: req.body.postedBy,
	postedById: req.body.postedById,
	status: "Not Accepted",
  });

  service.save((err,service) => {
    if(err) return res.json({success:false, err})
    Service.find({'_id': service._id})
    .exec((err,result) => {
      if(err) return res.json({success:false, err})
      return res.status(200).json({success:true,result})
    })
  })
});

serviceRouter.post('/update/:id', async (req, res) => {  // tested but not extensively
    Service.findOneAndUpdate({_id: req.params.id}, {status: req.body.status}, {new: true}, (err, data) => {
        if(err) throw err;
        else res.json(data);
    });
});

serviceRouter.delete('/deleteServices/:id', (req, res) => {
  Service.findByIdAndRemove(req.params.id, (err, data) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({success:true, data})
  });
  Service.deleteMany({responseTo: req.params.id}, (err, data) => {
    if(err) return res.json({success:false, err})
  });
});



module.exports = serviceRouter;
