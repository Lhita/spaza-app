
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from products', [], function(err, results) {
		console.log(results);
        if (err) return next(err);
    		res.render( 'products', {
					no_products : results.length === 0,
					products : results
    		});
      });
	});
};




exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories', function(err, categories) {
			res.render('add', {categories:categories});
		});
	});
};
 
exports.popularProduct = function(req, res, next) {
	req.getConnection(function(err, connection) {
		if (err) return next(err);
		connection.query('SELECT products.product_name, SUM(sales.qty)AS QTY FROM sales INNER JOIN products ON sales.product_id = products.id GROUP BY products.product_name ORDER BY qty DESC LIMIT 1', [],function(err, results) {
			if (err) return next(err);
			res.render('popularProduct',{
				popularProduct: results
				});
		  });
     });
};

exports.search = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		var searchTerm = '%' + req.body.searchValue + '%';
		connection.query('SELECT product_name from products where product_name like ?', [searchTerm], function(err, results) {
			if(err) return next(err);
		 	
			res.render('products',{
				products: results
				 
			});
		});
	});
};

exports.leastProduct = function(req, res, next) {
	req.getConnection(function(err, connection) {
		if (err) return next(err);
		connection.query('SELECT products.product_name, SUM(sales.qty)AS qty FROM sales INNER JOIN products ON products.id= sales.product_id  GROUP BY products.product_name ORDER BY qty ASC LIMIT 1', function(err, results) {
			if (err) return next (err);
			res.render('leastProduct', {
				leastProduct:results
			});
		});
	});
};


exports.earningsPerProduct = function(req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next (err);
		connection.query('SELECT products.product_name, SUM(sales.sales_price * sales.qty) AS EARNINGS from sales INNER JOIN products ON products.id = sales.product_id  GROUP BY product_name DESC', [], function(err, results) {
			if (err) return next(err);
			res.render('earningsPerProduct',{
				earningsPerProduct: results
			})
		})
	})
}

exports.profitsPerProduct = function(req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next (err);
		connection.query('SELECT products.product_name, (sales.sales_price - purchases.stock_price) AS profits FROM sales, purchases, products INNER JOIN products ON products.id = sales.product_id GROUP BY product_name ', [], function(err, results) {
			if (err) return next (err);
			res.render('profitsPerProduct', {
				profitsPerProduct: results
			});
		});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
		product_name : input.product_name,
      	category_id : input.category_id
  	};
		connection.query('insert into products set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/products');
		});
	});
}; 

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM products WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
  	var id = req.params.id;
  	req.getConnection(function(err, connection){
		connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          res.redirect('/products');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM products WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
};
