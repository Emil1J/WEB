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
			
	$scope.signIn = function(){
	    if (!$scope.email || $scope.email.length == 0 || 
	    		!$scope.password || $scope.password.length == 0)
	    {
	    	return;
		}else{
			var data = {
            		email : $scope.email,
            		password : $scope.password
            };
			
			$http.get("http://localhost:8080/WebProject/LoginServlet?",data)
        	.success(function(response) {
        		$scope.records = response;
        	}).error(function(response){
        	
        	});
	   }
	};
	
}]);

