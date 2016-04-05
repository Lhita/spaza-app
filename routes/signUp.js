var bcrypt = require('bcrypt');

exports.signUp = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
		username : input.username,
		roles: 'admin',
      	  	};

      	bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash("password", salt, function(err, hash) {
       		 	// Store the hash
        		data.password = hash;

				connection.query('insert into users set ?', data, function(err, results) {
  					if (err){
						res.redirect('/');
					}else{
						res.redirect('/login');
					}

				});
			});
		});
    });
};