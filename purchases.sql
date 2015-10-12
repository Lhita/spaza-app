INSERT INTO purchases (Qty, stock_date, cost_price,  product_id, supplier_id)
SELECT stock_purchases_csv.quantity, stock_purchases_csv.date, stock_purchases_csv.cost, products.id, suppliers.id
FROM  stock_purchases_csv
INNER JOIN products ON products.product_name = stock_purchases_csv.item
INNER JOIN suppliers ON suppliers.supplier_name = stock_purchases_csv.shop;


