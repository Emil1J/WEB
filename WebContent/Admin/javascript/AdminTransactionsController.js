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
		    	   $scope.UnrepliedMessages = response.data.Messages;
		    	   for(var i = 0; i < $scope.UnrepliedMessages.length ; i++){
		    		   if($scope.UnrepliedMessages[i].adminread == 0){
		    			   unread++;
		    		   }
		    	   }
		    	   $scope.unread = unread;
		    	   if($scope.unread != 0){
		    		   document.getElementById("TabMessages").innerHTML = "Messages (" + $scope.unread + ")";
		    	   }
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		
		var noTrans = document.getElementById('noTrans');
		
		$scope.myFunction = function(){
			var input, filter, table, tr, td, i;
			  input = document.getElementById("keywordInput");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("TableLocation");
			  tr = table.getElementsByTagName("tr");
			  for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
			      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }       
			  }
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
		var table = document.getElementById('table-scroll');
		var userFilterLine = document.getElementById('userFilterLine');
		var bookFilterLine = document.getElementById('bookFilterLine');
		var userFilter = document.getElementById('userFilter');
		var bookFilter = document.getElementById('bookFilter');

		
		$http.post("http://localhost:8080/BooksForAll/AllTransactionsServlet")
		   .then(
		       function(response){
		    	   $scope.AllTransactions = response.data.UserTransactions;
		    	   $scope.transactions = response.data.UserTransactions;
		    	   if($scope.transactions.length == 0){
		    		   table.style.display = "none";
		    		   noTrans.style.display = "block";
		    		   userFilterLine.style.display = "none";
		    		   bookFilterLine.style.display = "none";
		    		   userFilter.style.display = "none";
		    		   bookFilter.style.display = "none";
		    	   }else{
		    		   noTrans.style.display = "none";
		    		   table.style.display = "block";
		    	   }
		    	   
		    	   $scope.books = ["All"];
		    	   $scope.users = ["All"];
		    	   for(var i = 0; i < $scope.transactions.length ; i++){
		    		   var trans = $scope.transactions[i];
		    		   if($scope.books.indexOf(trans.bookname) < 0){
		    			   $scope.books.push(trans.bookname);
		    		   }
		    		   if($scope.users.indexOf(trans.username) < 0){
		    			   $scope.users.push(trans.username);
		    		   }
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
		
		$scope.FilterBooks = function(){
			document.getElementById("userFilter").value = "All";
			var chosenbook = document.getElementById("bookFilter").value;
			var FilteredTransactions = [];
			if(chosenbook == "All"){
				$scope.transactions = $scope.AllTransactions;
				return;
			}
			for(var i = 0; i < $scope.AllTransactions.length ; i++){
				if($scope.AllTransactions[i].bookname == chosenbook){
					FilteredTransactions.push($scope.AllTransactions[i]);
				}
			}
			$scope.transactions = FilteredTransactions;
		}
		
		$scope.FilterUsers = function(){
			document.getElementById("bookFilter").value = "All";
			var chosenuser = document.getElementById("userFilter").value;
			var FilteredTransactions = [];
			if(chosenuser == "All"){
				$scope.transactions = $scope.AllTransactions;
				return;
			}
			for(var i = 0; i < $scope.AllTransactions.length ; i++){
				if($scope.AllTransactions[i].username == chosenuser){
					FilteredTransactions.push($scope.AllTransactions[i]);
				}
			}
			$scope.transactions = FilteredTransactions;
		}
		
	}]);

