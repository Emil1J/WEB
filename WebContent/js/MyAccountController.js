angular.module('app',[])
	.controller('myAccountController',function($scope,$http){
 	   var user =  JSON.parse(localStorage.getItem('loginResponse'));
		var data = {
				Username : user.response.User.username		
        };
		
		$http.post("http://localhost:8080/BooksForAll/UserBooksServlet?", data)
		   .then(
		       function(response){
		    	   localStorage.setItem('userBooks', JSON.stringify(user))
		    	   $scope.books = user.response.User.books;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
});

