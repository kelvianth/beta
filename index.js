const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')
const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session ({
    secret:'som3_s3cret_keys',
    cookie: {}
}));


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

mongoose.connect(('mongodb+srv://root:dhyD9SDOsTVc2JcY@cluster0.imabx.mongodb.net/demo?retryWrites=true&w=majority'),
                 (err, res) => {
                    if (err) {
                        console.err(err);
                    }
                    else {
                        console.log('Database Connected')
                    }
                 })


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const wishRouter = require('./routes/wish');
const cartRouter = require('./routes/cart');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/wishlist', wishRouter);
app.use('/cart', cartRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server sudah berjalan')
    //console.log(__dirname)
})

