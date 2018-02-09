/* Our main application module is defined here using a single controller which will initiate its scope
and define some behavior.
This module further depends on an helper module 'txtHighlight'.
*/
angular.module('app',[])
	.controller('loginController', ['$scope','$http', function($scope,$http) {
	
    //$scope.query = "";//this variable will hold the user's query
	
	//obtain some dataset online
	//$http is AngularJS way to do ajax-like communications
		
////	$http.get("http://localhost:8080/ExampleServletv3/customers") ///name/Alfreds Futterkiste
//			.success(function(response) {
//			   $scope.records = response;
//			   $scope.result = $scope.records;//this variable will hold the search results
//			});
			
	//this method will be called upon change in the text typed by the user in the searchbox
	$scope.signIn = function(){
	    if (!$scope.email || $scope.email.length == 0 || 
	    		!$scope.password || $scope.password.length == 0)
	    {
	    	//need to do something to show error
			return;
		}else{
			
			var data = {
            		email : $scope.email,
            		password : $scope.password
            };
			
			$http.get("http://localhost:8080/WebProject/Login?",data)
        	.success(function(response) {
        		$scope.records = response;
        	}).error(function(response){
        	
        	});
	   }
	};
	
	//delegate the text highlighting task to an external helper service 
	$scope.hlight = function(text, qstr){
		return highlightText.highlight(text, qstr);
	};
	
}]);

