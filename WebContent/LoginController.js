angular.module('app',[])
	.controller('loginController', ['$scope','$http', function($scope,$http){
		document.getElementById('invalid').style.display= "none";
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
						  document.getElementById('invalid').style.display= "none";
						  localStorage.setItem('loginResponse', JSON.stringify(response.User));
						  if($scope.username == "admin" && $scope.password == "Passw0rd"){
							  window.location="./Admin/html/AdminHomePage.html";
						  }
						  else{
							  window.location="./User/html/LandingPage.html";
						  }
					  }else{
						  document.getElementById('invalid').style.display= "block";
						  $scope.errorMessage = 'Invalid username or password.';
					  }
				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});
		 };		 
}]);
