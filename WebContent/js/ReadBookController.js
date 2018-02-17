angular.module('app',[])
	.controller('readBookController', ['$scope','$http', function($scope,$http){
	var book = localStorage.getItem('SelectedForReadingBook');
	var user =  JSON.parse(localStorage.getItem('loginResponse'));
	alert(JSON.stringify(book));
	alert(JSON.stringify(user));
	$http.post("http://localhost:8080/BooksForAll/UserBooksServlet?Username=" + user.username)
   		.then(
  			function(response){
   			}, 
   			function(response){
   				// failure callback
   			}
    );
	window.scrollTo(0, 5000);		
}]);

