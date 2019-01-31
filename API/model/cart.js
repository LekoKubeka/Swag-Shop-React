var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var ObjectId = mongoose.Schema.Types.ObjectId;

var cart = new Schema({ /*can only have one cart per user*/
     title: {type: String, default: "Leko's Cart"}, 
    products:[{type: ObjectId, ref:'Product'}]
});


module.exports = mongoose.model('Cart', cart);
