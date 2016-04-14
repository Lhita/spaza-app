$(document).ready(function(){
        $("#searchTerm").keyup(function(){
            var searchValue = $("#searchTerm").val();
            console.log(searchValue);
            $.get("/products/search/" + searchValue, function(results){
                $("#products").html(results)
            });
        });

        $("#categorySearch").keyup(function(){
        	var searchValue = $("#categorySearch").val();
        	$.get("/categories/search/" + searchValue, function(results) {
        		$("#categories").html(results)
        	});
        });
    });