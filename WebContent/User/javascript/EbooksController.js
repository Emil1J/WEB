angular.module('app',[])
	.controller('ebooksController', ['$scope','$http', function($scope,$http){
	
		$(document).ready(function(){
		    $('[data-toggle="tooltip"]').tooltip({
		    });
		})
		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="BookView.html";
		}
		
		$scope.GetLikes = function(likes){
			var likeNames = "";
			var arrayLength = likes.length;
			for (var i = 0; i < arrayLength; i++) {
				var obj = likes[i]
				likeNames = likeNames + obj.username + "\n"
			}
			return likeNames;
		}
		
		$http.post("http://localhost:8080/BooksForAll/AllBooksServlet?")
		   .then(
		       function(response){
		    	   $scope.books = response.data.BookList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$scope.PurchaseBook = function(book){
			localStorage.setItem('purchaseBook', JSON.stringify(book));
			window.location="Purchase.html";
		}
		
		$scope.CheckIfBookPurchased = function(book){
			var books = JSON.parse(localStorage.getItem('loginResponse')).books;
			for(var i=0 ; i<books.length ; i++){
				if(books[i].Name == book.Name){
					document.getElementById("PurchasedButton").disabled = true;
					return "Already Purchased";
				}
			}
			return "Purchase";
		}
		
		$scope.CheckIfBookPurchasedIDs = function(book){
			var books = JSON.parse(localStorage.getItem('loginResponse')).books;
			for(var i=0 ; i<books.length ; i++){
				if(books[i].Name == book.Name){
					return "Purchased";
				}
			}
			return "Purchase";
		}
	}]);