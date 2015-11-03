SELECT stock_item, SUM(no_sold) AS total_sold
from sales_csv
GROUP BY stock_item
ORDER BY total_sold desc
limit 1;