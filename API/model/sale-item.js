var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var ObjectId = mongoose.Schema.Types.ObjectId;

var SaleItem = new Schema({
    title: String, 
    price: Number, 
    relatedItems: [{type:ObjectId, ref: 'Product'}]
});


module.exports = mongoose.model('SaleItem', SaleItem);