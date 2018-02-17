angular.module('app',[])
	.controller('readBookController', ['$scope','$http', function($scope,$http){
	var user = JSON.parse(localStorage.getItem('loginResponse'));
	var bookName = window.location.pathname.split("/")[3];
	bookName = bookName.split(".")[0].substring(-3);
	$http.post("http://localhost:8080/BooksForAll/ScrollPositionServlet?Username=" + user.username + "&Bookname=" + bookName)
   		.then(
  			function(response){
  				var scroll = response.data.Position
  				window.scrollTo(0, scroll);		
   			}, 
   			function(response){
   				// failure callback
   			}
    );
	
	window.onbeforeunload = function () {
		$http.post("http://localhost:8080/BooksForAll/UpdateScrollPositionServlet?Username=" + user.username + "&Bookname=" + bookName
				+"&Position=" + window.pageYOffset)
   		.then(
  			function(response){
   			}, 
   			function(response){
   				// failure callback
   			}
    );
	}
}]);

