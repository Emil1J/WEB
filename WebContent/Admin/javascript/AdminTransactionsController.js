angular.module('app',[])
	.controller('adminTransactionsController',['$scope','$http', function($scope,$http){
		
		var noTrans = document.getElementById('noTrans');

		
		$http.post("http://localhost:8080/BooksForAll/AllTransactionsServlet?")
		   .then(
		       function(response){
		    	   $scope.transactions = response.data.UserTransactions;
		    	   if($scope.transactions.length == 0){
		    		   noTrans.style.display = "block";
		    	   }else{
		    		   noTrans.style.display = "none";
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

