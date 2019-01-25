var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var ObjectId = mongoose.Schema.Types.ObjectId; 

var wishList = new Schema({
    title: {type: String, default: "Cool Wish List"}, /*default if a name is not provided*/
    /*we relate products to the wishlist*/
    products:[{type: ObjectId, ref:'Product'}] /*ObjectId means that the product has to be a mongo object, already in the database*/ 
});

module.exports = mongoose.model('WishList', wishList);
