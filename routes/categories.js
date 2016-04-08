exports.search = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		var searchTerm = '%' + req.body.searchValue + '%';
		connection.query('SELECT category_name FROM categories WHERE category_name LIKE ?', [searchTerm], function(err, results){
			if (err) return next(err);
			res.render('categories',{
				categories: results
			})
		})
	})
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next(err);
		var query = 'SELECT  * from categories';
		//var popular = 'SELECT categories.category_name, sum(sales.qty) as qty FROM sales INNER JOIN products ON sales.product_id = products.id INNER JOIN categories ON categories.id = products.category_id GROUP BY categories.category_name ORDER BY QTY DESC LIMIT 1';
		connection.query(query, [], function(err, results) {

			//connection.popular(popular,[], function(err, results1) {


			if (err) 
				return next(err);

			res.render('categories', {
				
				categories : results,
				//mostCat : results1

		
			});
		});
	});
};

exports.showAddCategories = function(req, res){
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories', function(err, categories) {
			res.render('categories', {
			categories : categories
			});
		});
	});
};
exports.popularCat = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT categories.category_name, SUM(sales.qty) AS QTY FROM sales INNER JOIN products ON sales.product_id = products.id INNER JOIN categories ON categories.id = products.category_id GROUP BY categories.category_name ORDER BY QTY DESC LIMIT 1', [], function(err, results) {	
        if (err) return next(err);
    		res.render( 'popularCat', {
				popularCat : results
    		});
      	});
	});
};


exports.leastCategory = function(req, res, next) {
		req.getConnection(function(err, connection) {
			if (err)
			return next (err);
		        connection.query('SELECT categories.category_name, SUM(sales.qty) AS QTY FROM sales INNER JOIN products ON sales.product_id = products.id INNER JOIN categories ON categories.id = products.category_id GROUP BY categories.category_name ORDER BY QTY ASC limit 1; ',[],function (err, results) {
				if (err){
					//console.log("...." + results.length);
					return (err);	
				}
				res.render('leastCategory', {
				    leastCategory : results
				});	
			});				
		})
	};


exports.earningsPerCategory = function(req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next (err);
		connection.query('SELECT categories.category_name, SUM(sales.sales_price * sales.qty)AS earninigs FROM sales INNER JOIN products ON products.id = sales.product_id INNER JOIN categories ON categories.id = products.category_id GROUP BY category_name DESC', [], function(err, results) {
			if (err) return next(err);
			res.render('earningsPerCategory', {
				earningsPerCategory: results
			});
		});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next(err);
		
		
		// get the data from the user & put it in a map that match your db columns
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			category_name : input.category_name,
		};

		connection.query('insert into categories set ?', data, function(err, results) {
			if (err) return next(err);
			res.redirect('/categories');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err,rows){
			if(err){
		        console.log("Error Selecting : %s ",err );
			}
		    res.render('editCategories',{page_title:"Edit Customers - Node.js", data : rows});

		});
	});
};

exports.update = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE categories SET ? WHERE Id = ?', [data, id], function(err, rows){
			if (err){
		       console.log("Error Updating : %s ",err );
			}
		    res.redirect('/categories');
		});
	});
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
	    connection.query('DELETE FROM categories WHERE Id = ?', [id], function(err,rows){
	        if(err)
	            return next(err);
	             res.redirect('/categories');
		    
		});
	});
};