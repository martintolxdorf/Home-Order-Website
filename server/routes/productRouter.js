const express = require('express');
const Products = require('../models/productSchema.js');
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    Products.find({}, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

productRouter.get('/:username', async (req, res) => {
  Products.findOne({username: req.params.username}, function (err, data) {
    if(err) throw err;
    res.json(data);
  });
});

productRouter.post('/create', async (req, res) => {
    const products = new Products({
      username: req.body.username
    });
    console.log(products);
    products.save()
    .then(data => {
        res.json(data);
    });
});

productRouter.post('/update/:username', async (req, res) => {
  Products.findOneAndUpdate({username: req.params.username}, {
    $push: {
        products: {
            name: req.body.name, 
            price: req.body.price
        }
    }
  }, {new: true}, (err, data) => {
    if(err) throw err;
    else res.json(data);
  });
});

productRouter.delete('/:username', async (req, res) => {
  Products.findOneAndRemove({username: req.params.username}, (err, data) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({success:true, data});
  });
});

productRouter.delete('/:username/:productId', async (req, res) => {
  Products.findOneAndUpdate({username: req.params.username}, {
    $pull: {
      'products': {_id: req.params.productId} 
    } 
  }, {new: true}, (err, data) => {
    if(err) {res.status(404).send({error:'Order could not be found'})};
    res.json(data);
  });
});

module.exports = productRouter;
