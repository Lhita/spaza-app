
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from categories', [], function(err, results) {
		console.log(results);
        if (err) return next(err);
    		res.render( 'mostPopularCategories', {
					no_products : results.length === 0,
					categories : results
    		});
      	});
	});
};

exports.showAddCategories = function(req, res) {
	req.getConnection(function(err, connection) {
		connection.query('SELECT category_name, categories', function(err, results){
			if(err) return next(err);
			res.render('categories',{
				categories : categories
			});
		});
	});
};

exports.add = function(req, res) {
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
