exports.show = function(req, res. next) {
	req.getConnection(function(err, connection) {
		if (err) 
			return next (err);
		connection.query('SELECT products.product_name, SUM(sales.sales_price - purchases.cost_price)AS total_profits FROM purchases INNER JOIN products ON products.id = sales.product_id INNER JOIN purchases ON purchases.product_id = products.id ')


	})
}sales.