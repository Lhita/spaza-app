var fs = require('fs');

var productSold = require("./productSold");

var findLeastPopolarProduct = function(fileName) {
	var productMap = productSold.productsSold(fileName);
	var leastPplrProduct = {};
	var min = 328;
		for(var prop in productMap) {
			var value = productMap[prop];
			
			if(productMap[prop] < min){
				min = productMap[prop];
				leastPplrProduct = {
					name: prop,
					amount: min
				}

			}
		}
		console.log(leastPplrProduct);
		return leastPplrProduct;

};
exports.itemsSold = function(fileName) {
	var leastPplrProduct = findLeastPopolarProduct (fileName);
	return leastPplrProduct;
};

