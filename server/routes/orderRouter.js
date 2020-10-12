const express = require('express');
const Orders = require('../models/orders.js');
const orderRouter = express.Router();

orderRouter.get('/', async (req, res) => {  // ONLY GETS NOT ACCEPTED ORDERS***
    Orders.find({status: "Not Accepted"}, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

orderRouter.get('/all', async (req, res) => {  // gets all orders
  Orders.find({}, function (err, data) {
    if(err) throw err;
    res.json(data);
  });
});

orderRouter.get('/:username', async (req, res) => {  // gets all submitted orders by the user
  Orders.find({username: req.params.username}, function (err, data) {
    if(err) throw err;
    res.json(data);
  });
});

orderRouter.post('/create', async (req, res) => {
    const order = new Orders({
      username: req.body.username,
      status: "Not Accepted",
      products: req.body.products,
      price: req.body.price,
      store: req.body.store,
      address: req.body.address
    });
    console.log(req.body.storeName);
    order.save()
    .then(data => {
        res.json(data);
    });
});

orderRouter.post('/update/:id', async (req, res) => {  // tested but not extensively
    Orders.findOneAndUpdate({_id: req.params.id}, {status: req.body.status}, {new: true}, (err, data) => {
        if(err) throw err;
        else res.json(data);
    });
});

orderRouter.delete('/:id', async (req, res) => {  // not tested
    Orders.findOneAndRemove({_id: req.params.id}, (err, data) => {
      if(err) throw err;
      return res.json(data);
    });
  });

module.exports = orderRouter;
