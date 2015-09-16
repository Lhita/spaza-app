var fs = require('fs');

 var findCategory = function(fileName) {

	var productSold = require("./productSold");


	var productCategoryMap = {
		'Milk 1l':'Dairy',
		'Imasi':'Dairy', 
		'Bread':'Grain',
		'Chakalaka Can': 'Can', 
		'Gold Dish Vegetable Curry Can': 'Can',
		'Fanta 500ml':'coldDrinks', 
		'Coke 500ml':'coldDrinks', 
		'Cream Soda 500ml':'coldDrinks', 
		'Iwisa Pap 5kg':'Grain', 
		'Top Class Soy Mince': 'DryGroceries', 
		'Shampoo 1 litre':'Toiletries', 
		'Soap Bar':'Toiletries', 
		'Bananas - loose': 'Fruit',
		'Apples - loose':'Fruit', 
		'Mixed Sweets 5s':'Confectionery', 
		'Heart Chocolates':'Confectionery', 
		'Rose (plastic)': 'Gifts',
		'Valentine Cards':'Gifts'
		}

		var productsMap = productSold.productsSold(fileName);
		var categoryMap ={};
	
		for(var productName in productsMap) {
			var categoryName = productCategoryMap[productName];
			var qty = productsMap[productName];

			if(categoryMap[categoryName] === undefined){
				categoryMap[categoryName]= 0;
		
			}
		categoryMap[categoryName]= categoryMap[categoryName]+ qty;
		}
		
		console.log(categoryMap);
		return categoryMap;

};

exports.cat = function(fileName){
     var categoryMap = findCategory(fileName);
        return categoryMap;
};
