INSERT INTO sales (sales_price, qty, product_id)

SELECT sales_csv.no_sold,sales_csv.sales_price, products.id 
FROM sales_csv  
INNER JOIN products ON products.product_name = sales_csv.stock_item;

/*SELECT DISTINCT  FROM sales;*/