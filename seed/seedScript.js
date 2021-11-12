const mongoose = require ('mongoose');
const Product = require ('../models/product');

mongoose.connect('mongodb+srv://root:dhyD9SDOsTVc2JcY@cluster0.imabx.mongodb.net/demo?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const allproducts = [
    new Product({
        imagePath: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: 'Top',
        price: 179999
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: 'Bottom',
        price: 49999
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: 'Outer Wear',
        price: 149999
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: 'Inner',
        price: 129999
    }),
    new Product ({
        imagePath: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: 'Socks',
        price: 229999
    })
];

var done = 0;
for(var i=0; i<allproducts.length; i++) {
    allproducts[i].save(function (err,result) {
        done++;
        if(done === allproducts.length){
            console.log('saved');
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};