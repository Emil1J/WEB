angular.module('app',[])
	.controller('adminEbooksController', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
		var admin = JSON.parse(localStorage.getItem('loginResponse'));

		$scope.unread = 0;
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnreadMessages")
		   .then(
		       function(response){
		    	   $scope.messages = response.data.Messages;
		    	   $scope.unread = response.data.Messages.length;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		$(document).ready(function(){
		    $('[data-toggle="tooltip"]').tooltip({
		    });
		})
		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="AdminBookView.html";
		}
		
		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
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
		$http.post("http://localhost:8080/BooksForAll/AllBooksServlet")
		   .then(
		       function(response){
		    	   $scope.books = response.data.BookList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
	});