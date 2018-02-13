angular.module('app',[])
	.controller('homePageController',function($scope,$http){
		var loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
		var user = loginResponse.response.User;
		$scope.welcomename = user.username;
		var data = { };
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet?",data)
		.then(function (response){
			$scope.books = response.data.BookList;
	},function(xhr){
	});
});

