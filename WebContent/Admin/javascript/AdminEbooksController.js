angular.module('app',[])
	.controller('adminEbooksController', function($scope,$http){
		
		//Controller variables.
		var admin = JSON.parse(localStorage.getItem('loginResponse'));

		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		
		//Get all books to display them to the admin.
		$http.post("http://localhost:8080/BooksForAll/AllBooksServlet")
		   .then(
		       function(response){
		    	   $scope.books = response.data.BookList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );

		//Get the admin's unreplied messages to check how many are unread in order to initialize navigation bar messages.
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   $scope.UnrepliedMessages = response.data.Messages;
		    	   var unread = 0;
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
		
		//Once user clicks on like nickname, he'll be redirected to the user's page.		
		$scope.viewUser = function(user){
			var dataQuery = {
				    Username: user
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/UserServlet",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: JSON.stringify(dataQuery),
				  success: function(response) {
					  if(response.Result == "Success"){
						  localStorage.setItem("ChosenUser", JSON.stringify(response.User));
						  window.location = "AdminUserView.html";
					  }

				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});
		}
	});