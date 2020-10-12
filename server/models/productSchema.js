const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: {type: String , required: true },
    products:[{
      name:{type: String , required: true },
      price: {type: String , required: true},
      picture: {data: Buffer, contentType: String}
    }]
  });

const Products = mongoose.model('Products', productSchema);

module.exports = Products;
