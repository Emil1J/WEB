angular.module('app',[])
	.controller('adminEbooksController', ['$scope','$http', function($scope,$http){
	
		$(document).ready(function(){
		    $('[data-toggle="tooltip"]').tooltip({
		    });
		})
		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="AdminBookView.html";
		}
		
		$scope.viewUser = function(user){
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/UserServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
				    Username: user
				  },
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
		
		$http.post("http://localhost:8080/BooksForAll/AllBooksServlet?")
		   .then(
		       function(response){
		    	   $scope.books = response.data.BookList;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
	}]);