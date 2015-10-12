INSERT INTO suppliers (supplier_name) 

SELECT distinct shop FROM stock_purchases_csv;