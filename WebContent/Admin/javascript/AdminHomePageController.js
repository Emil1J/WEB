angular.module('app',[])
	.controller('adminHomePageController',['$scope','$http', function($scope,$http){
		$scope.unread = 0;
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnreadMessages?")
		   .then(
		       function(response){
		    	   $scope.messages = response.data.Messages;
		    	   $scope.unread = response.data.Messages.length;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet?")
			.then(function (response){
				$scope.books = response.data.BookList;
			},function(xhr){
		});
		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="AdminBookView.html";
	}
	}]);

