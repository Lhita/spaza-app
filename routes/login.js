var bcrypt = require('bcrypt');

exports.login = function(req, res, next) {
	req.getConnection(function(err, connection) {
		var input = JSON.parse(JSON.stringify(req.body));
		var username = req.body.username;
		var password = req.body.password;

		connection.query('SELECT * FROM users WHERE username =?',username, function(err,users) {
			//var user = users[0];
			//if(Password === users[0].password ) {
			//	console.log('welcome');
   			//   res.redirect('/home'); 
			// }else {
   //           	res.redirect('/login');
   //               };

   if (users[0].username === undefined) {

        req.flash("message", "invalid username/ password!");
        return res.redirect("/");
       };

       bcrypt.compare(password, users[0].password, function(err, pass) {
         	if (pass) {
           	// check if user is on my database login
           	req.session.user = users[0].username;
           	//if the user puts invalid password redirect to home page
           	return res.redirect("/home");
        		}else {
   				}
   			});
   		});
	});
};
		