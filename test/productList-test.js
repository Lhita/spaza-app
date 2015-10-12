var assert = require("assert");

var ProductList = require("../productList");
var products = require("../productSold");
/*var categories = require('../category');
*/


//describe("Find data in file", function(){


    it('should return a unique list of product in the file synchronously', function(){

        
        var productLines = ProductList.linesInFiles('./files/Nelisa Sales History.csv');
       		 assert.deepEqual(productLines, ["Milk 1l","Imasi","Bread","Chakalaka Can","Gold Dish Vegetable Curry Can","Fanta 500ml","Coke 500ml","Cream Soda 500ml","Iwisa Pap 5kg","Top Class Soy Mince","Shampoo 1 litre","Soap Bar","Bananas - loose","Apples - loose","Mixed Sweets 5s","Heart Chocolates","Rose (plastic)","Valentine Cards"]);

	});
//});

it('should return the total number of items sold', function(){
        
        var fileName = ('./files/Nelisa Sales History.csv');
        var product = products.productsSold(fileName);
            console.log(product);

            assert.equal(142, product['Milk 1l']);
            assert.equal(125, product['Imasi']);
            assert.equal(130, product['Bread']);
            assert.equal(94, product['Chakalaka Can']);
            assert.equal(86, product['Gold Dish Vegetable Curry Can']);
            assert.equal(94, product['Fanta 500ml']);
            assert.equal(159, product['Coke 500ml']);
            assert.equal(75, product['Cream Soda 500ml']);
            assert.equal(47, product['Iwisa Pap 5kg']);
            assert.equal(98, product['Top Class Soy Mince']);
            assert.equal(26, product['Shampoo 1 litre']);
	    assert.equal(50, product['Soap Bar']);
            assert.equal(114, product['Bananas - loose']);
            assert.equal(114, product['Apples - loose']);
            assert.equal(172, product['Mixed Sweets 5s']);
            assert.equal(20, product['Heart Chocolates']);
            assert.equal(14, product['Rose (plastic)']);
            assert.equal(14, product['Valentine Cards']);
           
            
        }); 

it('should return the total number of items sold', function(){

    var mostPopularItems = require("../mostpopularItem");
    var Popular = mostPopularItems.itemsSold('./files/Nelisa Sales History.csv');
    var resultMap = { name : "Mixed Sweets 5s", amount : 172 };

    assert.deepEqual(resultMap, Popular);
});

it('should categorize the products', function(){
  
   var categories = require('../category');

      var salesCat = categories.cat('./files/Nelisa Sales History.csv');
   
        var map = {
           'Dairy':267,
           'Grain':177,
           'Can':180,
           'coldDrinks':328,
           'DryGroceries':98,
           'Toiletries':76,
           'Fruit':228,
           'Confectionery':192,
           'Gifts':28,
         }
         
         //console.log(map);
       assert.deepEqual(map, salesCat);
      
});

it('should return the most popular category & total sales for the month', function(){
  
    var mostPopularCategory = require('../mostPopularCategory');

    var popularSales = mostPopularCategory.getCategory('./files/Nelisa Sales History.csv');

    var popularMap = {categoryName: 'coldDrinks', amt:328 };

      assert.deepEqual(popularSales,popularMap);

    });

it('should return the least popular product', function(){

    var leastPopularItems = require("../leastPopularProdct");
    var Popular = leastPopularItems.itemsSold('./files/Nelisa Sales History.csv');
    var resultMap = { name : "Rose (plastic)", amount : 14 };

    assert.deepEqual(resultMap, Popular);
});

it('should return the least popular category & total sales for the month', function(){
  
    var leastPopularCategory = require('../leastPopularCategory');

    var popularSales = leastPopularCategory.getCategory('./files/Nelisa Sales History.csv');

    var leastMap = { productName: 'Gifts', amt:28 };

      assert.deepEqual( popularSales,leastMap);

    });


