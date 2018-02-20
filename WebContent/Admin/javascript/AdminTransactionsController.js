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
		
		var noTrans = document.getElementById('noTrans');
		var table = document.getElementById('table-scroll');
		
		$http.post("http://localhost:8080/BooksForAll/AllTransactionsServlet?")
		   .then(
		       function(response){
		    	   $scope.transactions = response.data.UserTransactions;
		    	   if($scope.transactions.length == 0){
		    		   table.style.display = "none";
		    		   noTrans.style.display = "block";
		    	   }else{
		    		   noTrans.style.display = "none";
		    		   table.style.display = "block";

		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		$scope.GetDateFormat = function(DateTime){
			var date = DateTime.split(' ')[0];
 		   var time = DateTime.split(' ')[1].split(":")[0] + ":" + DateTime.split(' ')[1].split(":")[1];
 		   return date + ' at ' + time;
		}
		
	}]);

