DROP TABLE IF EXISTS `categories`;

CREATE TABLE categories (
	id int NOT NULL AUTO_INCREMENT, 
	category_name VARCHAR(50),
	primary key(id),
	CONSTRAINT uc_category_name UNIQUE (category_name)

	);

DROP TABLE IF EXISTS `products`;
CREATE TABLE products (
	id int NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50)NOT NULL,
	category_id int,
	primary key(id),
	FOREIGN KEY(category_id) REFERENCES categories(id),
	CONSTRAINT uc_product_name UNIQUE (product_name)
	);


DROP TABLE IF EXISTS `sales`;
CREATE TABLE sales (
	id int NOT NULL AUTO_INCREMENT,
	sales_price int,
	qty int,
	product_id int,
	primary key(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
	

	);


DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE suppliers (
	id int NOT NULL AUTO_INCREMENT,
	supplier_name VARCHAR(50)NOT NULL,
	primary key(id)
	);


DROP TABLE IF EXISTS `purchases`;
CREATE TABLE purchases (
	id int NOT NULL AUTO_INCREMENT,
	Qty int,
	stock_date date NOT NULL,
	cost_price int,
	product_id int,
	supplier_id int,
	primary key(id),
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(supplier_id) REFERENCES suppliers(id)
	
	);