/* Our main application module is defined here using a single controller which will initiate its scope
and define some behavior.
This module further depends on an helper module 'txtHighlight'.
*/
angular.module('app',[])
	.controller('loginController', ['$scope','$http', function($scope,$http){
	
    //$scope.query = "";//this variable will hold the user's query
	
	//obtain some dataset online
	//$http is AngularJS way to do ajax-like communications
		
////	$http.get("http://localhost:8080/ExampleServletv3/customers") ///name/Alfreds Futterkiste
//			.success(function(response) {
//			   $scope.records = response;
//			   $scope.result = $scope.records;//this variable will hold the search results
//			});
		$scope.signUp = function(){
			/*$.ajax({
				  url: "http://localhost:8080/BooksForAll/RegistrationServlet?",
				  type: "POST", //send it through get method
				  data: { 
				    Username: $scope.username, 
				    Password: $scope.password
				  },
				  success: function(response) {
					  $scope.records = response;
	            		$scope.result = $scope.records;
				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});*/
		}
		
		
		
		$scope.login = function () {
	           // use $.param jQuery function to serialize data from JSON 
				$.ajax({
				  url: "http://localhost:8080/BooksForAll/LoginServlet?",
				  type: "POST", //send it through get method
				  data: {
				    Username: $scope.username, 
				    Password: $scope.password
				  },
				  success: function(response) {
					  $scope.records = response;

					  $scope.result = $scope.records;
					  if($scope.result.Result == "Success"){
						  window.location="LandingPage.html";
					  }

				  },
				  error: function(xhr) {
				    //Do Something to handle error
				  }
				});
		 };
	
}])

.directive('passwordVerify', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, elem, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function() {
            	scope.pw.confirm_password.$setValidity('passwordVerify', true);
                if (scope.confirm_password === $scope.user_password) {
                    scope.pw.confirm_password.$setValidity('passwordVerify', true);
                    scope.pw.user_password.$setValidity('passwordVerify', true);
                } else if (scope.confirm_password !== $scope.user_password) {
                    scope.pw.confirm_password.$setValidity('passwordVerify', false);
                    ssscope.pw.user_password.$setValidity('passwordVerify', false);
                }
                scope.pw.confirm_password.$setValidity('passwordVerify', true);
            });
        }
     };
});
