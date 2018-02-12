angular.module('app2',[])
	.controller('homePageController', ['$scope','$http', function($scope,$http){
		var loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.username = loginResponse.response.User.username;
		$.ajax({
			  url: "http://localhost:8080/BooksForAll/TopFiveBooksServlet?",
			  type: "POST", //send it through get method
	          dataType: 'json',
			  data: {
			  },
			  success: function(response) {
				  if(response.Result == "Success"){
					  localStorage.setItem('topFiveBooksServlet', JSON.stringify({response}));
					  for(var i = 0 ; i < 5 ; i++){
						  $scope.topLiked = 'Liked' + i;
						  document.getElementById('Liked' + i).src = response.BookList[i].Photo;
						  document.getElementById('Liked' + i).height = 300;
						  document.getElementById('Liked' + i).width = 200;
					  }
				  }

			  },
			  error: function(xhr) {
			    //Do Something to handle error
			  }
			});
}]);

