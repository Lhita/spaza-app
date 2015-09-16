var fs = require('fs');

var category = require("./category");

var findmostPopularCategory = function(fileName) {
	var productMap = category.cat(fileName);
		var max = 0;

		for(var prop in productMap){
			var value =productMap[prop];

			if(productMap[prop] > max){
				max = productMap[prop];
				mostPopularCategory = {
					categoryName: prop,
					amt: max
			};
		};


};
		console.log(mostPopularCategory);
		return mostPopularCategory;


};

exports.getCategory = function(fileName){
	var mostPopularCategory = findmostPopularCategory(fileName);
	return mostPopularCategory;

};



