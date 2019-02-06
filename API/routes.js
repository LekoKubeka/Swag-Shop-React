  var express = require('express');
var router = express.Router();


var Product = require('./model/product');
var WishList = require('./model/wishlist');
var Cart = require('./model/cart');
var SaleItem = require('./model/sale-item');

//Allow all requests from all domains & localhost
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

/*creating a product - event emitter*/
router.post('/product', function(req, res){/* a route*/
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
router.get('/product', function(req, res){
   Product.find({},function(err, fetchedProducts){/*remember, functions of this type are async*/
       if (err){
           res.status(500).send({error:"Could not get products"});
       }else{
           res.status(200).send(fetchedProducts);
       }
   }); 
});

/*returns all wishLists*/

router.get('/wishlist', function(req, res){
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
router.post('/wishlist', function(req, res){
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

router.put('/wishlist/product/add', function(req, res){
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

/*create a cart || if one exists already deny*/
    router.post('/cart', function(req, res){
       /* check for existing cart*/
        Cart.find(function(err, cart){
            if (err){
                res.status(500).send({error:"Something went wrong"});
            }
            
            if(!cart.length){
                var newCart = new Cart(req.body); /*a new cart needs a title*/
                newCart.save(function(err, savedCart){
                   if (err){
                       res.status(500).send({error:"Couldn't save your new cart"});
                   }else{
                       res.send(savedCart);
                   }
                });
            }else{
                res.send('You already have a cart, you can only create one');
            }
        });
    });

/*display the cart*/
router.get('/cart', function(req, res){
    Cart.find({}, function(err, returnedCart){
        if(err){
       res.status(500);
        }else{
       res.send(returnedCart);
        }    
    });
   
});

/*delete a product from the cart*/

router.put('/cart/remove', function(req, res){
    Product.findOne({_id: req.body.productId}, function(err, productToDel){
        if(err){
            res.status(500);
        }else{
            Cart.update({}, {$pull: {products: productToDel._id }}, function(err, UpdatedCart){
                if (err){
                    res.status(500);
                }else{
                    res.send(UpdatedCart);
                }
            });

        }

    });
});

/*add an existing product to the cart*/
    router.put('/cart/add', function(req, res){
       Product.findOne({_id: req.body.productId}, function(err, productToAdd){
         if (err){
             res.status(500).send({error:"Couldn't find product"});
         }else{
             Cart.update({},{$addToSet:{products:productToAdd._id}}, function(err, UpdatedCart){
                 if (err){
                     res.status(500).send({error:"Couldn't add to cart"});
                 }else{
                     res.send(UpdatedCart);
                 }
             });
         }  
       });
    });

router.post('/saleitems/add', function(req, res){
   var saleitem = new SaleItem(req.body);
    saleitem.save(function(err, savedSaleItem){
        if (err){
            res.status(500);
        }else{
            res.send(savedSaleItem);
        }
    })
});

router.get('/saleitems', function(req, res){
    SaleItem.find({}).populate({path:'products', model: 'Product'}).exec(function(err, populatedSaleItems){
     if(err){
           res.status(500).send({error:"Could not get wish lists"});
       }else{
            res.status(200).send(populatedSaleItems);
    }
    });
});


module.exports = router; 