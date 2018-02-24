angular.module('app',[])
	.controller('adminUsersController',['$scope','$http', function($scope,$http){
		
		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		
		//Get all the users from the server.
		$http.post("http://localhost:8080/BooksForAll/AllUsersServlet")
		   .then(
		       function(response){
		    	   $scope.users = response.data.UsersList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );

		//Get the admin's unreplied messages to check how many are unread in order to initialize navigation bar messages.
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   var unread = 0;
		    	   $scope.UnrepliedMessages = response.data.Messages;
		    	   for(var i = 0; i < $scope.UnrepliedMessages.length ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
		    	   if($scope.unread != 0){
		    		   document.getElementById("TabMessages").innerHTML = "Messages (" + $scope.unread + ")";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Sign out and end session.
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
		//Once user clicks on comment image or name he'll be redirected to the user's page.
		$scope.viewUser = function(user){
			localStorage.setItem("ChosenUser", JSON.stringify(user));
			window.location = "AdminUserView.html";
		}
		
		
		
	}]);

