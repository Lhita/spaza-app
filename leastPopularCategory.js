var fs = require('fs');

var category = require("./category");

var findleastPopularCategory = function(fileName) {
	var productMap = category.cat(fileName);
		var min = 328;

		for(var prop in productMap){
			var value =productMap[prop];

			if(productMap[prop] < min){
				min = productMap[prop];
				leastPopularCategory = {
					productName: prop,
					amt: min
			};
		};


};
		console.log(leastPopularCategory);
		return leastPopularCategory;


};

exports.getCategory = function(fileName){
	var leastPopularCategory = findleastPopularCategory(fileName);
	return leastPopularCategory;

};



