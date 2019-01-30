var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json()); /*middleware*/
app.use(bodyParser.urlencoded({extended: false}));

/*creating a product - event emitter*/
app.post('/product', function(req, res){/* a route*/
   var product = new Product(/*req.body also works if the body is well defined*/);
    product.title = req.body.title; /*the client puts it in the body using the key 'title'*/
    product.price = req.body.price;
    product.save((err, savedProduct)=>{
       if (err){
           res.status(500).send({error:"Could not save product"});
       } else {
           res.status(200).send(savedProduct); /*typical in REST api design to send back the newly created object in the response: this is so that mobile apps can refresh dynamically, without reloading a whole View*/
       }
    }); /*if an error return the error, if success return the created product*/
});

/*fetch a list of products and send it back to user.*/
app.get('/product', function(req, res){
   Product.find({},function(err, fetchedProducts){/*remember, functions of this type are async*/
       if (err){
           res.status(500).send({error:"Could not get products"});
       }else{
           res.status(200).send(fetchedProducts);
       }
   }); 
});

/*returns all wishLists*/

app.get('/wishlist', function(req, res){
  /*mongoose populates each wishlist we find for us, with the products array that currently exist, then finds it*/
    WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, populatedWishlists){
     if(err){
           res.status(500).send({error:"Could not get wish lists"});
       }else{
            res.status(200).send(populatedWishlists);
    }
    });
    
    
    /* WishList.find({}, function(err, fetchedWishLists){
       if(err){
           res.status(500).send({error:"Could not get wish lists"});
       }else{
            res.status(200).send(fetchedWishLists);

       }
   });*/ 
});

/*adds a new wishList*/
app.post('/wishlist', function(req, res){
   var wishList = new WishList();
    wishList.title = req.body.title; 
    
    wishList.save(function(err, newWishList){
        if (err){
            res.status(500).send({error:"Could not create a wishlist"});
        }else{
            res.send(newWishList);
        }
    });
});

app.put('/wishlist/product/add', function(req, res){
    /*first we find the product we want to add to the database, and validate*/
    Product.findOne({_id: req.body.productId}, function(err, productToAdd){/*the client sends an id in the body of its get request*/
        if(err){
           res.status(500).send({error:"Could not add item to wish list"});
       }else{
            /*then we add it to this wishlist*/
         WishList.update({_id:req.body.wishListId}, {$addToSet:{products: productToAdd._id}}, function(err, UpdatedWishList){
             if (err){ /*could probably make this DRY*/
                 res.status(500).send({error: "Could not get update wishlist"});
             }else{
                 res.send(UpdatedWishList);
             }
         });

       }
    }); 
   
});

app.listen(3000, ()=>{
    console.log('Swag Shop API running on port 3000...');
});