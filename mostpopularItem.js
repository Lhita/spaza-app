var fs = require('fs');

var productSold = require("./productSold");

var findMostPopolarProduct = function(fileName) {
	var productMap = productSold.productsSold(fileName);
	var mostPplrProduct = {};
	var max = 0;
		for(var prop in productMap) {
			var value = productMap[prop];
			
			if(productMap[prop] > max){
				max = productMap[prop];
				mostPplrProduct = {
					name: prop,
					amount: max
				};

			}
		}
		console.log(mostPplrProduct);
		return mostPplrProduct;

};
exports.itemsSold = function(fileName) {
	var mostPplrProduct = findMostPopolarProduct (fileName);
	return mostPplrProduct;
};
