'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    bcrypt = require('bcrypt'),
    flash = require('express-flash');

    var products = require('./routes/products'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    categories = require('./routes/categories'),
    suppliers = require('./routes/suppliers'),
    signUp =require('./routes/signUp'),
    login = require('./routes/login'),
   // logout = require('.routes/logout'),
    users = require('./routes/users');

    
var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'coder123',
      port: 3306,
      database: 'spaza_app'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
  console.log('in the middleware :' + req.path);
  next();
});

// var roles = {
//   Nelisa : 'admim',
//   Xolani: 'admin',
//   Mpho: 'customer'
// };

app.use(session ({secret: 'keyboard cat', saveUninitialized:false,resave: true, coockie: {maxAge: 60000}}));

app.use(flash());

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());




function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


app.get('/', function(req, res) {
  res.render('login', {
      layout :false,
  });
});

app.post('/login', login.login);

// app.get("/login", function(req, res){
//     res.render("home", {});
// });

app.get('/signUp', function(req, res){
  res.render('signUp', {
    layout :false,
  });
});

app.post('/signUp', signUp.signUp);


// var checkUser = function(req, res, next){
//   if(req.session.user){
//   return next();
// }
//   res.redirect('/');
// };

app.get("/home", function(req, res){
    res.render("home");
});

app.get('/logout', function(req, res){
  delete req.session.user
  res.redirect('/');
})

//products
app.get('/products/search/:searchValue', products.search);
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/delete/:id', products.delete);
app.get('/products/popularProduct', products.popularProduct);
app.get('/products/leastProduct', products.leastProduct);
app.get('/products/earningsPerProduct', products.earningsPerProduct);
app.get('/products/profitsPerProduct', products.profitsPerProduct);

//sales handlebars
app.get('/sales/search/:searchValue', sales.search);
app.get('/sales', sales.show);
app.get('/sales/editSales/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.get('/sales/add', sales.showAddSales);
app.post('/sales/add', sales.add);
app.get('/sales/delete/:id', sales.delete);

//purchases handlebars
app.get('/purchases/search/:searchValue', purchases.search);
app.get('/purchases/search', purchases.search);
app.get('/purchases', purchases.show);
app.get('/purchases/editPurchases/:id', purchases.get);
app.post('/purchases/update/:id', purchases.update);
app.get('/purchases/add', purchases.showAddPurchases);
app.post('/purchases/add', purchases.add); 
app.get('/purchases/delete/:id', purchases.delete);  

//category handlebars
app.get('/categories/search/:searchValue', categories.search);
app.get('/categories', categories.show);
app.get('/categories/editCategories/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.get('/categories/add', categories.showAddCategories);
app.post('/categories/add', categories.add);
app.get('/categories/delete/:id', categories.delete);
app.get('/categories/popularCat', categories.popularCat);
app.get('/categories/leastCategory', categories.leastCategory);
app.get('/categories/earningsPerCategory', categories.earningsPerCategory);
app.get('/categories/profitsPerCategory', categories.profitsPerCategory);

//Suppliers handlebars
app.get('/suppliers/search/:searchValue', suppliers.search);
app.get('/suppliers', suppliers.show);
app.get('/suppliers/editSuppliers/:id', suppliers.get);
app.post('/suppliers/update/:id', suppliers.update);
app.get('suppliers/add', suppliers.showAddSuppliers);
app.post('/suppliers/add', suppliers.add);
app.get('/suppliers/delete/:id', suppliers.delete);

app.get('/users', users.showUsers);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});