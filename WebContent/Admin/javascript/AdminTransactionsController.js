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
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet")
		   .then(
		       function(response){
		    	   var unread = 0;
		    	   for(var i = 0; i < $scope.UnrepliedMessages ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
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
		var table = document.getElementById('table-scroll');

		
		$http.post("http://localhost:8080/BooksForAll/AllTransactionsServlet")
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

