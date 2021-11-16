const express = require('express')
const router = express.Router();
const Cart = require('../models/cart')
const Wish = require('../models/wish')
const Product = require('../models/product')

router.get('/', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('pages/cart', { products: 0 });
    }
    var cart = new Cart(req.session.cart);
    console.log(cart.generateArray());
    res.render('pages/cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});









router.get('/remove/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
 
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
 });
 
 router.get('/reduce/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
 
    cart.reduce(productId);
    req.session.cart = cart;
    res.redirect('/cart');
 });
 
 router.get('/increase/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
 
    cart.increase(productId);
    req.session.cart = cart;
    res.redirect('/cart');
 });
 

router.get('/add-to-wish-from-cart/:id', (req, res, next) => {
    const productId = req.params.id;
    const wish = new Wish(req.session.wish ? req.session.wish : {});
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/allproduct');
        }
        wish.add(product, product.id);
        cart.removeItem(productId);
        req.session.wish = wish;
        req.session.cart = cart;
        console.log(req.session.wish);
        res.redirect('/cart');
    });
});

module.exports = router;