angular.module('app',[])
	.controller('adminTransactionsController',['$scope','$http', function($scope,$http){
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

