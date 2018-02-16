angular.module('app',[])
	.controller('homePageController',function($scope,$http){
		var user = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.welcomename = user.username;
		var data = { };
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet?",data)
		.then(function (response){
			$scope.books = response.data.BookList;
	},function(xhr){
	});
});

