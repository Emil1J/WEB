angular.module('app',[])
	.controller('ebooksController', ['$scope','$http', function($scope,$http){
	
		$scope.likedNames = function(book){
			var names;
			for(var x in book.Likes){
				names += x.username;
			}
			document.getElementsById(book.Name).title = names;
		}

		$(document).ready(function(){
		    $('[data-toggle="tooltip"]').tooltip();
		});
		
		$http.post("http://localhost:8080/BooksForAll/AllBooksServlet?")
		   .then(
		       function(response){
		    	   $scope.books = response.data.BookList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
	}]);