

exports.showUsers = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next(err);
		connection.query('SELECT * from users', [], function(err, results) {
			if (err) 
				return next(err);
			var result = {
				users : results
			};
			console.log(req.query);
			res.render( 'users', result);
		});
	});
};


exports.get = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
				console.log("data")
	var id = req.params.id;
		req.getConnection(function(err, connection){
				if (err)
					return next(err);
			var query = "SELECT * FROM users WHERE id = ?";
				connection.query(query, [id,data], function(err,rows){
						if(err){
						console.log("Error Selecting : %s ",err );
						}
			res.render('users_edit', {page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};
exports.update = function(req, res, next){
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {
		user_role:input.user_role
	};
	var id = req.params.id;
	console.log(data);
		req.getConnection(function(err, connection){
			connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows){
				if (err){
					console.log("Error Updating : %s ",err );
					}
			res.redirect('/users');
		});
	});
};
exports.delete = function(req, res, next){
	var id = req.params.id;
		req.getConnection(function(err, connection){
			connection.query('DELETE FROM users WHERE id = ?', [id], function(err,rows){
				if(err){
					console.log("Error Selecting : %s ",err );
				}
			res.redirect('/users');
		});
	});
};