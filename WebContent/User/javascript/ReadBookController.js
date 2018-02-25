angular.module('app',[])
	.controller('readBookController', ['$scope','$http', function($scope,$http){
		
		//Initialize variables
		var user = JSON.parse(localStorage.getItem('loginResponse'));
		var bookName = JSON.parse(localStorage.getItem('ChosenBook')).Name;
		var data = {
			Username: user.username,
			Bookname: bookName
		}

		//Check whether there is a session. In case not, go back to login page.
		$http.post("http://localhost:8080/BooksForAll/CheckSessionServlet")
			.then(function (response){
				if(response.data.Result == "Failure"){
					window.location = "../../Login.html";
				}
			},function(xhr){
		});
	
		//Get the scroll position and decide whether to load according to it or not.
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

		//Once the back button is clicked, perform a scrol lsave.
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
}]);

