angular.module('app',[])
	.controller('adminUsersController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/AllUsersServlet?")
		   .then(
		       function(response){
		    	   $scope.users = response.data.UsersList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$scope.viewUser = function(user){
			localStorage.setItem("ChosenUser", JSON.stringify(user));
			window.location = "AdminUserView.html";
		}
	}]);

