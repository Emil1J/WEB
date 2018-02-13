angular.module('app',[])
	.controller('homePageController', ['$scope','$http', function($scope,$http){
		var loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
		var user = loginResponse.response.User;
		$scope.welcomename = user.username;
		$.ajax({
			  url: "http://localhost:8080/BooksForAll/TopFiveBooksServlet?",
			  type: "POST", //send it through get method
	          dataType: 'json',
			  data: {
			  },
			  success: function(response) {
				  if(response.Result == "Success"){
					  localStorage.setItem('topFiveBooksServlet', JSON.stringify({response}));
					  $scope.books = response.BookList;
				  }
			  },
			  error: function(xhr) {
			  }
			});
}]);

