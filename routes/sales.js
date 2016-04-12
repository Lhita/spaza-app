exports.search = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var searchTerm = '%' + req.body.searchValue + '%';
		connection.query('SELECT sales.id, products.product_name, DATE_FORMAT(sales.sales_date,"%d/%m/%Y")as sales_date, sales.sales_price, sales.qty FROM sales INNER JOIN products ON products.id = sales.product_id WHERE product_name like ?', [searchTerm], function(err, results){
			if(err) return next(err);
			res.render('sales',{
				sales: results
			});
		});
	});
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		
		connection.query('SELECT sales.id, products.product_name, DATE_FORMAT(sales.sales_date,"%d/%m/%Y")as sales_date, sales.sales_price, sales.qty FROM sales INNER JOIN products ON products.id = sales.product_id ORDER BY sales_date DESC  ', [], function(err, results) {
        connection.query('SELECT * FROM products',  function(err, products) {
        	console.log(results);
        if (err) 
        	return next(err);
    		res.render( 'sales', {
				
				sales : results,
				products: products
    		});
         });
		});

	});
};

exports.showAddSales = function (req, res) {
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM products',  function(err, results) {
			if (err) 
				return next(err);
				res.render('sales',{
					products :products
			});
		})
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
			product_id :input.product_id,
      		sales_date : input.sales_date,
      		sales_price : input.sales_price,
      		qty : input.qty 		
  		};

		connection.query('insert into sales set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/sales');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM sales WHERE id = ?', [ id], function(err,rows){
        connection.query('SELECT * FROM products',  function(err, products) {
			if(err) return next(err);
			res.render('editSales',{page_title:"Edit Customers - Node.js", 
			data : rows[0],
			products : products
			});
		});
	});

	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	/*var data = {
			
		product_id :input.product_id,
      	sales_date : input.sales_date,
      	sales_price : input.sales_price,
      	qty : input.qty 		
  	};*/

  	req.getConnection(function(err, connection){
		connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows){
    		if (err) return next(err);
    				//console.log(input.product_id);
          	res.redirect('/sales');
    	});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};