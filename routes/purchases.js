exports.search =function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		var searchTerm = '%' + req.params.searchValue + '%';
		connection.query('SELECT purchases.id, products.product_name, DATE_FORMAT(purchases.stock_date,"%Y/%m/%d")as stock_date, purchases.cost_price, purchases.Qty, suppliers.supplier_name FROM purchases INNER JOIN products ON products.id = purchases.product_id  INNER JOIN suppliers ON suppliers.id = purchases.supplier_id WHERE product_name like ?', [searchTerm], function(err, results) {
			if(err) return next(err);
			res.render('search_purchases',{
			purchases: results,
			layout: false
			});
		});	
	});
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);

		connection.query('SELECT products.product_name, DATE_FORMAT(purchases.stock_date,"%Y/%m/%d")as stock_date, purchases.cost_price, purchases.Qty, suppliers.supplier_name FROM purchases INNER JOIN products ON products.id = purchases.product_id  INNER JOIN suppliers ON suppliers.id = purchases.supplier_id', [], function(err, results) {
        	connection.query('SELECT * FROM suppliers',  function(err, suppliers) {
        		connection.query('SELECT * FROM products',  function(err, products) {

				console.log(results);
				if(err) return next(err);
				res.render('purchases',{
					purchases : results,
					products : products,
					suppliers: suppliers
					});
				});
			});
		});
	});
};

exports.showAddPurchases = function(req, res) {
	req.getConnection(function(err, connection) {
		connection.query('SELECT FROM * suppliers', function(err, results){
			if(err) return next(err);
			res.render('purchases',{
				suppliers : suppliers
			});
		});
	});
}

exports.add = function(req, res, results) {
	req.getConnection(function(err, connection){
		if(err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
			product_id :input.product_id,
			supplier_id :input.supplier_id,
      		stock_date : input.stock_date,
      		cost_price : input.cost_price,
      		Qty : input.Qty 		
  		};

		connection.query('insert into purchases set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/purchases');
		});
	});
};

exports.get = function(req, res, next) {
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM purchases WHERE id = ?', [id], function(err,rows){
        	connection.query('SELECT * FROM products',  function(err, products) {
        		connection.query('SELECT * FROM suppliers',  function(err, suppliers) {
					if(err) return next(err);

					res.render('editPurchases',{page_title:"Edit Customers - Node.js", 
					data : rows[0],
					
					products : products,
					suppliers : suppliers
					});
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
      	stock_date : input.stock_date,
      	cost_price : input.cost_price,
      	qty : input.qty 		
  	};*/

  	req.getConnection(function(err, connection){
		connection.query('UPDATE purchases SET ? WHERE id = ?', [data, id], function(err, rows){
    		if (err) return next(err);
    				//console.log(input.product_id);
          	res.redirect('/purchases');
    	});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM purchases WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/purchases');
		});
	});
};