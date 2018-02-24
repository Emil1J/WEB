angular.module('app',[])
	.controller('loginController', ['$scope','$http', function($scope,$http){
		
		//Initialize variables.
		var usernameInput = document.getElementById("username");
		var passwordInput = document.getElementById("password");

		//Hide error message.
		document.getElementById('invalid').style.display= "none";

		//Login function and redirect accordingly whether user or admin.
		$scope.login = function () {
				var queryData = {
						Username : $scope.username,
						Password : $scope.password
				}
	           // use $.param jQuery function to serialize data from JSON 
				$.ajax({
				  url: "http://localhost:8080/BooksForAll/LoginServlet",
				  type: "POST", //send it through post method
		          dataType: 'json',
				  data: JSON.stringify(queryData),
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
		 
		 //Allow enter to login.
		 usernameInput.addEventListener("keyup", function(event) {
			    event.preventDefault();
			    if (event.keyCode === 13) {
			        document.getElementById("submit").click();
			    }
		 });
		 
		 //Allow enter to login.
		 passwordInput.addEventListener("keyup", function(event) {
			    event.preventDefault();
			    if (event.keyCode === 13) {
			        document.getElementById("submit").click();
			    }
		 });
}]);
