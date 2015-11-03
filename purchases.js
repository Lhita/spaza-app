exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		
		connection.query(' SELECT product_nam, stock_purchases_csv.quantity, stock_purchases_csv.date, stock_purchases_csv.cost, products.id, suppliers.id
FROM  stock_purchases_csv
INNER JOIN products ON products.product_name = stock_purchases_csv.item
INNER JOIN suppliers ON suppliers.supplier_name = stock_purchases_csv.shop;INNER JOIN products ON products.id = sales.product_id ORDER BY sales_date DESC ', [], function(err, results) {
        connection.query('SELECT * FROM products',  function(err, products) {

        if (err) 
        	return next(err);
    		res.render( 'purhases', {
				products: products,
				purhases : results
    		});
         });
		});

	});
};

exports.showAddPurchases = function (req, res) {
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM produts',  function(err, results) {
			if (err) 
				return next(err);
				res.render('purchases',{
					products : products
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
			supplier_id : input.supplier_id,
      		sales_date : input.sales_date,
      		sales_price : input.sales_price,
      		qty : input.qty 		
  		};

		connection.query('insert into purhases set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/purhases');
		});
	});
};


exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM purhases WHERE id = ?', [ id], function(err,rows){
			if(err) return next(err);
			res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var sales = req.params.id;
	var data = {
			
			product_name :input.product_name,
      		sales_date : input.sales_date,
      		sales_price : input.sales_price,
      		qty : input.qty 		
  		};

  	req.getConnection(function(err, connection){
		connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows){
    		if (err) next(err);
          	res.redirect('/sales');
    	});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sale');
		});
	});
};