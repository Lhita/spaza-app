SELECT products.product_name, SUM( sales.qty ) AS qty
FROM sales
INNER JOIN products ON sales.product_id = products.id
GROUP BY products.product_name
ORDER BY QTY DESC
LIMIT 1; 