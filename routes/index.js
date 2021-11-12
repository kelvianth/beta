const express = require('express');
const Product = require('../models/product')
const Wish = require('../models/wish')
const Cart = require('../models/cart')
const router = express.Router();

router.get('/', async (req, res) => {
   res.render('pages/index');
})
router.get('/faq', async (req, res) => {
   res.render('pages/faq');
})
router.get('/hto', async (req, res) => {
   res.render('pages/hto');
})
router.get('/allproducts', async (req, res) => {
   var data = await Product.find();
   res.render('pages/allproducts', { products: data });
});

router.get('/add-to-wish/:id', (req, res) => {
   const productId = req.params.id;
   const wish = new Wish(req.session.wish ? req.session.wish : {});

   Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/allproducts');
       }
       wish.add(product, product.id);
       req.session.wish = wish;
       //console.log(req.session.wish);
       res.redirect('/allproducts');
   });
});

router.get('/add-to-cart/:id', (req, res, next) => {
   const productId = req.params.id;
   const cart = new Cart(req.session.cart ? req.session.cart : {});

   Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/allproducts');
       }
       cart.add(product, product.id);
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/allproducts');
   });
});




module.exports = router;