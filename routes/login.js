exports.login = function(req, res, next) {
	req.getConnection(function(err, connection) {
		var input = JSON.parse(JSON.stringify(req.body));
		var username = req.body.username;
		var Password = req.body.password;

		connection.query('SELECT * FROM users WHERE username =?',username, function(err,users) {
			//var user = users[0];
			if(Password === users[0].password ) {
				//console.log('welcome');
                res.redirect('/home'); 
				}
				else {
                     res.redirect('/login');
                 };
		});
	});
};
