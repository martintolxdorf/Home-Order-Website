const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    content: {type:String},
    responseTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    postedBy:{type: String},
    postedById:{type: String},
	status: {type: String , required: true },
}, {timestamps:true});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
