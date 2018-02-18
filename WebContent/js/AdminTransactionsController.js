angular.module('app',[])
	.controller('adminTransactionsController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/AllTransactionsServlet?")
		   .then(
		       function(response){
		    	   $scope.transactions = response.data.UserTransactions;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
	}]);

