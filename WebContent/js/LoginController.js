angular.module('app',[])
	.controller('loginController', ['$scope','$http', function($scope,$http){

		$scope.login = function () {
	           // use $.param jQuery function to serialize data from JSON 
				$.ajax({
				  url: "http://localhost:8080/BooksForAll/LoginServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
				    Username: $scope.username, 
				    Password: $scope.password
				  },
				  success: function(response) {
					  if(response.Result == "Success"){
						  localStorage.setItem('loginResponse', JSON.stringify({response}))
						  window.location="LandingPage.html";
					  }

				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});
		 };		 
}]);
