angular.module('app',[])
	.controller('adminUsersController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		$http.post("http://localhost:8080/BooksForAll/AllUsersServlet")
		   .then(
		       function(response){
		    	   $scope.users = response.data.UsersList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
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
		$scope.viewUser = function(user){
			localStorage.setItem("ChosenUser", JSON.stringify(user));
			window.location = "AdminUserView.html";
		}
	}]);

