angular.module('app',[])
	.controller('adminHomePageController',['$scope','$http', function($scope,$http){
		
		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});

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
		    		   document.getElementById("TabMessages").innerText = "Messages (" + $scope.unread + ")";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Get the top five most active users.
		$http.post("http://localhost:8080/BooksForAll/TopFiveActiveUsersServlet")
		   .then(
		       function(response){
					$scope.users = response.data.UsersList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		//Get the top five most liked books.
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet")
			.then(function (response){
				$scope.books = response.data.BookList;
			},function(xhr){
		});
		
		//Get the top five most purchased books.
		$http.post("http://localhost:8080/BooksForAll/TopFivePurchasedBooksServlet")
			.then(function (response){
				$scope.mostPurchasedBooks = response.data.BookList;
			},function(xhr){
		});

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
		
		//Once user clicks on book image, he'll be redirected to the book's page.		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="AdminBookView.html";
		}
		
		//Once user clicks on user image, he'll be redirected to the user's page.
		$scope.viewUser = function(user){
			localStorage.setItem("ChosenUser", JSON.stringify(user));
			window.location = "AdminUserView.html";
		}
		

	}]);

