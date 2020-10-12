const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {type: String , required: true },
    status: {type: String , required: true },
    price: {type: String},
    store: {type: String},
    address: {type:String},
    products:[{
      name:{type: String , required: true },
      price: {type: String , required: true},
      picture: {data: Buffer, contentType: String}
    }]
  });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;