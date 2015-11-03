SELECT categories.category_name, SUM(sales.qty) AS QTY
FROM sales
INNER JOIN products ON sales.product_id = products.id
INNER JOIN categories ON categories.id = products.category_id
GROUP BY categories.category_name
ORDER BY QTY DESC
 limit 1;