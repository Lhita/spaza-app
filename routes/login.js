exports.login = function(req, res, next) {
	req.getConnection(function(err, connection) {
		var username = req.body.username;
		var password = req.body.password;

		connection.query('SELECT * FROM users ',username, function(err,username) {
			if(password === users[0].password) {
                res.redirect('/login'); 
				}
				else {
                     res.redirect('/home');
                 };
		});
	});
};
