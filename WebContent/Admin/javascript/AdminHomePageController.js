angular.module('app',[])
	.controller('adminHomePageController',['$scope','$http', function($scope,$http){
		$scope.unread = 0;
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnrepliedMessagesServlet?")
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
		
		$http.post("http://localhost:8080/BooksForAll/TopFiveBooksServlet?")
			.then(function (response){
				$scope.books = response.data.BookList;
			},function(xhr){
		});
		
		$scope.viewBook = function(book){
			localStorage.setItem('viewBook', JSON.stringify(book));
			window.location="AdminBookView.html";
	}
	}]);

