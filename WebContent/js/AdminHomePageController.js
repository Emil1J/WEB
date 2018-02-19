angular.module('app',[])
	.controller('adminHomePageController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet?")
			.then(function (response){
				$scope.books = response.data.BookList;
			},function(xhr){
		});
		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="BookView.html";
	}
	}]);

