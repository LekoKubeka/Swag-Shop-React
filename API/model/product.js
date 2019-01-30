var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var product = new Schema({
    title: String, 
    price: Number, 
    likes: {type: Number, default: 0}
}); /*if it ain't in the schema, it won't be saved*/ 

module.exports = mongoose.model('Product', product); /*exports a product model with the key 'Product' ('Product' is the title that goes into the Mongo database*/