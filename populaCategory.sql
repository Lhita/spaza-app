SELECT categories.category_name, SUM(sales.qty) AS amount
FROM sales
INNER JOIN products ON products.id = sales.product_id
INNER JOIN categories ON categories.id = products.category_id
GROUP BY categories.category_name
ORDER BY amount ;