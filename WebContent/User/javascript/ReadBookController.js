angular.module('app',[])
	.controller('readBookController', ['$scope','$http', function($scope,$http){
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
		.then(function (response){
			if(response.data.Result == "Failure"){
				window.location = "../../Login.html";
			}
		},function(xhr){
	});
	var user = JSON.parse(localStorage.getItem('loginResponse'));
	var bookName = window.location.pathname.split("/")[3];
	bookName = bookName.split(".")[0].substring(-3);
	var data = {
			Username: user.username,
			Bookname: bookName
	}
	
	$http.post("http://localhost:8080/BooksForAll/ScrollPositionServlet", data)
   		.then(
  			function(response){
  				var offset = localStorage.getItem('ScrollBook');
  				var scroll = response.data.Position;
  				if(offset == 'False'){
  					scroll = 0;
  				}
  				window.scrollTo(0, scroll);		
   			}, 
   			function(response){
   				// failure callback
   			}
    );
	
	window.onbeforeunload = function () {
		var queryData = {
				Username : user.username,
				Bookname : bookName,
				Position : window.pageYOffset
		}
		$http.post("http://localhost:8080/BooksForAll/UpdateScrollPositionServlet", queryData)
   		.then(
  			function(response){
   			}, 
   			function(response){
   				// failure callback
   			}
    );
	}
	
	$scope.HelpMeButton = function(){
		var modal = document.getElementById('HelpMeModal');
		modal.style.display = "block";
	}
}]);

