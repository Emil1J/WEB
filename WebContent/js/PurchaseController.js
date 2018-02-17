angular.module('app',[])
	.controller('purchaseController', ['$scope','$http', function($scope,$http){
		$scope.book = JSON.parse(localStorage.getItem('purchaseBook'));
		var user =  JSON.parse(localStorage.getItem('loginResponse'));

		$scope.confirmAndBuy = function(valid){
			if(!valid){
				return;
			}
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/PurchaseBookServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
				    Username: user.username,
				    Bookname: $scope.book.Name
				  },
				  success: function(response) {
					  if(response.Result == "Success"){
						  window.location="MyAccount.html";
					  }

				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});
		}
	}]);