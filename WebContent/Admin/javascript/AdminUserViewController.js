angular.module('app',[])
	.controller('adminUserViewController',['$scope','$http', function($scope,$http){
		$scope.user = JSON.parse(localStorage.getItem("ChosenUser"));
		
		$scope.unread = 0;
		$http.post("http://localhost:8080/BooksForAll/AllAdminUnreadMessages?")
		   .then(
		       function(response){
		    	   $scope.messages = response.data.Messages;
		    	   $scope.unread = response.data.Messages.length;
		       }, 
		       function(response){
		         // failure callback
		       }
		    );
		$scope.UserClick = function(user) {
			localStorage.setItem('ChosenUser', JSON.stringify(user));
			var modal = document.getElementById('myModal');
		    modal.style.display = "block";
		}
		
		// When the user clicks on <span> (x), close the modal
		$scope.MyModalFunc = function() {
			var modal = document.getElementById('myModal');
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			var modal = document.getElementById('myModal');
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		$scope.DeleteUser = function(decision){
			if(decision == "No"){
				var modal = document.getElementById('myModal');
		        modal.style.display = "none";
		        return;
			}
			var user = JSON.parse(localStorage.getItem('ChosenUser'));
			$.ajax({
				  url: "http://localhost:8080/BooksForAll/RemoveUserServlet?",
				  type: "POST", //send it through get method
		          dataType: 'json',
				  data: {
				    Username: user.username, 
				  },
				  success: function(response) {
					  
				},
					  error: function(xhr) {
					    //Do Something to handle error
					  }
					});

			window.location = "AdminUsers.html";
		}
	}]);

