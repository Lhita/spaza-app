$(document).ready(function(){
    $("#productSearch").keyup(function(){
        var searchValue = $("#productSearch").val();
        //console.log(searchValue);
        $.get("/products/search/" + searchValue, function(results){
            $("#products").html(results)
        });
    });

    $("#categorySearch").keyup(function(){
        var searchValue = $("#categorySearch").val();
        $.get("/categories/search/" + searchValue, function(results){
        	$("#categories").html(results)
        });
    });

    $("#saleSearch").keyup(function(){
        var searchValue = $("#saleSearch").val();
        $.get("/sales/search/" + searchValue, function(results){
            $("#sales").html(results)
        });
    });

    $("#purchaseSearch").keyup(function(){
        var searchValue = $("#purchaseSearch").val();
        $.get("/purchases/search/" + searchValue, function(results){
            $("#purchases").html(results)
        });
    });

    $("#supplierSearch").keyup(function(){
        var searchValue = $("#supplierSearch").val();
        $.get("/suppliers/search/" + searchValue, function(results){
            $("#suppliers").html(results)
        });
    });
});