angular.module('app',[])
	.controller('adminTransactionsController',['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
			},function(xhr){
		});
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

		$scope.SignOutFunc = function(){
			$http.post("http://localhost:8080/BooksForAll/SignOutServlet")
			   .then(
			       function(response){
			       }, 
			       function(response){
			       }
			    );
		}
		
		$http.post("http://localhost:8080/BooksForAll/AllTransactionsServlet")
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

