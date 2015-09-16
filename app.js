var express = require('express');
var exphbs  = require('express-handlebars');
var product = require('./productList');
var products = require("./productSold");
var categories = require('./category'); 
var mostpopularItems = require("./mostpopularItem");
var mostPopularCategory = require('./mostPopularCategory');
var leastPopularItems = require("./leastPopularProdct");
var leastPopularCategory = require('./leastPopularCategory');


var app = express();
//var fs = require('fs'); 


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.use(express.static('public'));


app.get('/product', function(req,res) {
    var productMap = product.findFiles('./files/Nelisa Sales History.csv');
    	//console.log(productMap);
    		res.render('productList', {product: productMap});

});


app.get('/product/products', function(req,res) {
    var prodMap = products.productsSold('./files/Nelisa Sales History.csv');
   		 res.render('productSold', {product: prodMap});

});

app.get('/product/categories', function(req,res) {
    var productsMap = categories.cat('./files/Nelisa Sales History.csv');
       res.render('category', {product: productsMap});

});


app.get('/product/mostpopularItems', function(req,res) {
    var mostPplrProduct = mostpopularItems.itemsSold('./files/Nelisa Sales History.csv');
       res.render('mostpopularItems', {product: mostPplrProduct});

});

app.get('/product/mostPopularCategory', function(req,res) {
    var mostPplrProduct = mostPopularCategory.getCategory('./files/Nelisa Sales History.csv');
       res.render('mostPopularCategory', {product: mostPplrProduct});

});


app.get('/product/leastPopularItems', function(req,res) {
    var leastPopular = leastPopularItems.itemsSold('./files/Nelisa Sales History.csv');
       res.render('leastPopularProdct', {product: leastPopular});

});


app.get('/product/leastPopularCategory', function(req,res) {
    var leastCategory = leastPopularCategory.getCategory('./files/Nelisa Sales History.csv');
       res.render('leastPopularCategory', {product: leastCategory});

});

app.get('/', function (req, res) {
    res.render('home');
});
 
//app.listen(3000);

var port = process.env.PORT || 3000;
   var server = app.listen(port, function () {

     var host = server.address().address;
     var port = server.address().port;
     console.log(host);
     console.log('Example app listening at http://localhost:3000/');

   });

