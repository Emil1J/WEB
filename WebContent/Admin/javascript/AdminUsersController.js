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
		
		$scope.unread = 0;
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet?")
		   .then(
		       function(response){
		    	   var unread = 0;
		    	   for(var i = 0; i < $scope.UnrepliedMessages ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
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

